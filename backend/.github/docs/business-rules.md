# Business Rules

This document contains application-level rules that should be followed when implementing features in PennyWise.

The rules describe expected behavior and should not be changed implicitly by implementation details. Database constraints are a final integrity safeguard; authorization and business validation must also be enforced by the backend service layer.

Rules for spaces, transactions, budgets, savings goals, and categories are defined by the current database model but still require their routes, services, repositories, and tests to be implemented.

---

# Users

## Registration

A user must provide valid registration information.

Before creating a user:

1. Validate the request body.
2. Trim and normalize the email to lowercase.
3. Check whether the email already exists.
4. Hash the password with the application's password hashing utility.
5. Store only the password hash.
6. Return only safe user fields and authentication tokens.

Rules:

- Email addresses must be unique.
- Passwords must never be stored as plaintext.
- `password_hash` must never be returned in a normal API response.
- An existing email results in `409 Conflict`.
- The database unique constraint remains the final protection against duplicate emails.

---

## Authentication

Only authenticated users may access protected resources.

Authentication identifies:

```text
Who is the user?
```

Authorization determines:

```text
Is this user allowed to perform this operation?
```

These are separate concerns.

Rules:

- Protected routes must use authentication middleware.
- Access tokens must be validated before the request reaches the protected handler.
- Invalid or missing bearer credentials return `401 Unauthorized`.
- Refresh tokens must be stored as hashes.
- Revoked or expired refresh tokens cannot be used.
- Logout revokes the user's refresh tokens.
- Authentication responses must not expose password hashes or refresh-token hashes.

---

# Data Ownership and Authorization

User-owned resources must belong to the authenticated user.

The ownership relationship is:

```text
User
  ↓
Account
  ↓
Transaction
```

A user may access a transaction only when the related account belongs to that user and the transaction is available in the requested space.

Rules:

- Never trust an ID supplied by the client as proof of ownership.
- Ownership conditions must be included in repository queries.
- The backend must enforce authorization; the frontend must not be treated as a security boundary.
- A resource that does not exist or is not accessible to the user may be returned as `404 Not Found` to avoid leaking its existence.
- Space-owned resources must also verify that the user is a member of the space.

---

# Authorization

Every protected resource must verify ownership or permission before it is read or changed.

Rules:

- Never rely only on the frontend to prevent unauthorized operations.
- The backend is responsible for enforcing authorization.
- Authentication middleware identifies the user; services and repositories enforce what that user may access.
- Ownership and membership checks must be part of the data-access operation whenever possible.
- Authorization failures must not reveal private resource details.

---

# Accounts

An account represents one real-world source of money and belongs to exactly one user.

Users may:

```text
Create their own accounts
View their own accounts
Update their own accounts
Archive or close their own accounts
```

Users must not:

```text
View another user's account
Update another user's account
Archive or close another user's account
```

Rules:

- Every account must have an owning `user_id`.
- Account queries must include `accounts.user_id = authenticated_user_id`.
- Supported account types are `e-wallet`, `bank`, `cash`, `credit-card`, and `investment`.
- Supported account statuses are `active`, `archived`, and `closed`.
- Account names, types, and initial balances must pass schema validation.
- An initial balance must be a non-negative numeric value with no more than two decimal places.
- A user must not create a duplicate account with the same name and account type.
- A closed account cannot be reopened.
- Once an account has transactions, its initial balance cannot be changed.
- Account lists must support bounded pagination and may be filtered by status, type, or name.
- Account balance should be derived from the initial balance and valid transactions; it must not be independently changed without a defined business operation.
- Account deletion is not currently exposed by the API. Archiving or closing is preferred when historical transactions must be preserved.

---

# Spaces

A space is a financial context for organizing accounts, categories, transactions, budgets, and savings goals. A space may be `individual` or `shared`.

Rules:

- Every space must have a creator.
- The creator must be an owner and a member of the space.
- A space has `owner` and `member` roles.
- A user may belong to multiple spaces.
- A user must be a member of a space before accessing its financial data.
- Owners manage space membership and space-level settings.
- Members may manage financial data only when their permissions allow it.
- A shared space does not require a joint bank account.
- A space does not transfer ownership of an account; it only provides financial context for using that account.
- Deleting a space removes dependent space data according to the database cascade rules.

---

# Account-Space Relationships

An account may be made available in multiple spaces through `space_accounts`.

```text
User owns Account
	 ↓
Account is associated with Space
	 ↓
Transactions may use the Account in that Space
```

Rules:

- Adding an account to a space does not transfer account ownership.
- Only the account owner or an authorized space operation may create or remove the association.
- A transaction may use an account only when the (`space_id`, `account_id`) pair exists in `space_accounts`.
- The composite foreign key is a database safeguard and does not replace authorization checks.

---

# Expenses

An expense represents money leaving an account.

## Amount

Expense amount must be greater than zero.

Invalid:

```text
0
-100
```

Valid:

```text
100
500.50
```

Amounts must use exact decimal handling compatible with `numeric(15, 2)`. Do not use floating-point arithmetic for persisted money values.

## Expense Ownership

When creating an expense:

```text
Authenticated User
	↓
Verify Space membership
	↓
Verify Account exists
	↓
Verify Account belongs to User
	↓
Verify Account is available in Space
	↓
Verify Category belongs to Space, when provided
	↓
Validate positive amount
	↓
Create Expense
```

The client must not be able to create an expense against another user's account or an unrelated space.

## Updating Expenses

When updating an expense:

```text
Find Expense with ownership conditions
		↓
Verify space membership
		↓
Validate changes
		↓
Update Expense
```

Do not allow a user to update another user's expense. If an update changes its account, space, or category, validate the new relationships before updating it.

## Deleting Expenses

Before deleting:

```text
Find Expense with ownership conditions
		↓
Verify permission
		↓
Delete or reverse the financial event
```

If deleting an expense affects an account balance or related summary, the balance adjustment and expense deletion must be handled atomically in one database transaction.

---

# Income

Income represents money entering an account.

Rules:

- The amount must be greater than zero.
- The account must belong to the authenticated user.
- The account must be available in the selected space.
- The category, when provided, must belong to the selected space.
- Income must increase the account's derived balance.

When creating income:

```text
Authenticated User
	↓
Verify ownership and space access
	↓
Validate positive amount
	↓
Create Income
	↓
Update or derive Account Balance
```

If both the income record and account balance are modified, they must be handled in one database transaction.

---

# Transfers

A transfer moves money between two accounts.

Rules:

- A transfer must have a valid source account and destination account.
- Both accounts must be owned by or accessible to the authenticated user according to the account-space rules.
- The source and destination accounts must not be the same account.
- Both accounts must be valid for the selected space.
- The transfer amount must be greater than zero.
- Source and destination balance changes must succeed or fail together.
- A failed transfer must not leave only one side of the transfer recorded.

The current `transactions` table supports the `transfer` type, but the source/destination representation and transfer service are not yet implemented. That representation must be defined before transfer routes are added.

---

# Categories

Categories organize transactions within a space.

Rules:

- A category belongs to exactly one space.
- A user must be a member of the category's space to manage or use it.
- Category names must be unique within a space for the same category type.
- A category type must match the transaction type it classifies.
- Default categories may be created for a space, but custom categories remain space-specific.
- Deleting a category must not make historical transactions invalid; current database behavior sets related transaction `category_id` values to `NULL`.
- Category deletion should be replaced with archiving when historical reporting requires the category label to remain available.

---

# Savings

A savings goal represents a target amount belonging to a space.

Rules:

- A savings goal must belong to a space the user can access.
- The goal name is required.
- The target amount must be greater than zero.
- A target date is optional.
- Contributions and withdrawals must reference an existing savings goal.
- Savings transaction amounts must be greater than zero.
- Savings transaction types are `contribution` and `withdrawal`.
- A withdrawal must not make the goal's accumulated balance negative unless a future requirement explicitly allows it.
- Goal progress is derived from contributions minus withdrawals.
- Changes to a goal and related transactions must respect space authorization.

---

# Budgets

A budget represents a monthly spending limit for a space.

Rules:

- A budget belongs to exactly one space.
- A space may have only one budget for a given month and year.
- The month must be between `1` and `12`.
- The year must be `2000` or later.
- A budget category belongs to one budget and one category.
- A category may appear only once in a budget.
- A budget-category amount must be greater than zero.
- The category must belong to the same space as the budget.

Remaining budget is conceptually:

```text
remaining_budget = budget_amount - total_qualifying_expenses
```

Only expenses matching the budget's space, category, and month must be counted. Income, transfers, unrelated spaces, and unrelated categories must not reduce a budget.

---

# Transactions

Transactions record financial events associated with an account and a space.

Supported types are:

```text
expense
income
transfer
```

Rules:

- Every transaction belongs to exactly one account and one space.
- The (`space_id`, `account_id`) pair must exist in `space_accounts`.
- An optional category must belong to the same space as the transaction.
- The amount must be greater than zero.
- The transaction date defaults to the current date when omitted.
- Financial calculations must use exact decimal values.
- Transaction history must be ordered explicitly and filtered by authorized ownership or space membership.
- Operations affecting multiple financial records must use database transactions when consistency is required.

Example:

```text
BEGIN
    Create transaction
    Update or derive account balance
    Update related budget or savings summary
COMMIT
```

If any operation fails:

```text
ROLLBACK
```

The application must not leave the database in a partially updated state.

---

# Validation

Validation must happen before business operations are performed.

Typical validation includes:

```text
Required fields
Correct data types
Valid email
Positive monetary amount
Valid dates
Valid IDs
Allowed enum values
Ownership and membership
Related records in the same space
```

Schema validation should reject malformed input at the request boundary. Business validation that requires database state belongs in the service layer.

---

# Conflict Handling

Use a conflict response when an operation conflicts with existing application state.

Examples:

```text
Register with an existing email
	 ↓
409 Conflict

Create an existing account
	 ↓
409 Conflict

Reopen a closed account
	 ↓
409 Conflict

Change initial balance after transactions exist
	 ↓
409 Conflict
```

Do not treat every database error as a generic conflict. Preserve the distinction between validation errors, authorization failures, missing resources, conflicts, and unexpected server errors.

---

# Not Found

Return `404 Not Found` when a requested resource does not exist or is intentionally treated as inaccessible.

For user-owned resources, include ownership conditions in the lookup instead of retrieving by ID first and checking ownership afterward.

Conceptual query:

```sql
SELECT transaction.id, transaction.amount
FROM transactions AS transaction
JOIN accounts AS account ON account.id = transaction.account_id
WHERE transaction.id = requested_id
  AND account.user_id = current_user_id;
```

This prevents unauthorized users from using resource IDs to discover whether another user's records exist.

---

# Business Rule Changes

When implementing a feature:

- Follow these rules.
- Do not silently change them through implementation details.
- If a requirement conflicts with these rules, ask for clarification.
- If a new rule is introduced, update this document.
- Keep business rules separate from database and framework implementation details.
- Update affected migrations, Kysely types, repositories, services, routes, and tests when a rule changes the data model or behavior.
- Mark rules as implemented only when the backend actually enforces and tests them.
