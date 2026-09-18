# PennyWise Database

## Database System

PennyWise uses **PostgreSQL** as its relational database system.

- The `pg` package provides the PostgreSQL connection pool.
- Kysely provides the typed query builder and PostgreSQL dialect.
- `DATABASE_URL` supplies the connection string through the application environment configuration.
- Kysely's `Migrator` and `FileMigrationProvider` discover and apply the migrations in `backend/src/db/migrations` in filename order.
- PostgreSQL enforces primary keys, foreign keys, unique constraints, check constraints, enum values, defaults, and cascading behavior at the database level.

Run the latest migrations from the backend directory with:

```bash
npm run migrate
```

The migrations are incremental. Later migrations may add constraints or tables to structures created earlier, so a database should be migrated to the latest version rather than recreated from a partial migration.

## Database Principles

The schema follows these principles:

1. **Relational integrity first.** Relationships are represented with foreign keys and composite keys instead of being enforced only in application code.
2. **Users own personal data.** Accounts, spaces, and refresh tokens are linked to users, and user deletion cascades to dependent records where defined.
3. **Spaces are the financial boundary.** Shared financial data belongs to a space. Accounts are attached to spaces through `space_accounts`, and transactions must reference a valid space-account pair.
4. **Use database constraints for invariants.** Required fields, uniqueness, valid enum values, positive monetary values, valid budget months, and valid budget years are enforced by PostgreSQL.
5. **Use exact numeric types for money.** Monetary values use `numeric(15, 2)` rather than floating-point types.
6. **Use timestamps for audit information.** Creation and update fields use `timestamptz` with a database default of `now()`.
7. **Preserve useful history.** Categories referenced by transactions are set to `NULL` when deleted, while dependent records such as budgets and savings-goal transactions are removed with their parent.
8. **Protect credentials and tokens.** Passwords and refresh tokens are stored only as hashes and must not be returned by API responses.
9. **Make destructive behavior explicit.** Deletion behavior is defined per relationship with `CASCADE` or `SET NULL`; application code must not assume every relationship behaves the same way.

## Core Entities

### `users`

Represents application users and their login credentials.

| Column          | Type           | Rules                                                     |
| --------------- | -------------- | --------------------------------------------------------- |
| `id`            | `bigserial`    | Primary key.                                              |
| `name`          | `varchar(255)` | Required.                                                 |
| `email`         | `varchar(255)` | Required and unique.                                      |
| `password_hash` | `varchar(255)` | Required; stores a secure password hash, never plaintext. |
| `created_at`    | `timestamptz`  | Required; defaults to `now()`.                            |
| `updated_at`    | `timestamptz`  | Required; defaults to `now()`.                            |

Rules:

- `id` is the primary key.
- `email` must be unique.
- Passwords must never be stored as plaintext.
- Passwords must be hashed with the application's secure password hashing utility before insertion.
- Authentication logic must not expose `password_hash` through API responses.

### `accounts`

Represents a user's financial account, such as a bank account, wallet, or credit account.

| Column            | Type             | Rules                                                |
| ----------------- | ---------------- | ---------------------------------------------------- |
| `id`              | `bigserial`      | Primary key.                                         |
| `user_id`         | `bigint`         | Required foreign key to `users.id`; deletes cascade. |
| `name`            | `varchar(100)`   | Required.                                            |
| `account_type`    | `varchar(50)`    | Required.                                            |
| `initial_balance` | `numeric(15, 2)` | Required; defaults to `0`.                           |
| `created_at`      | `timestamptz`    | Required; defaults to `now()`.                       |
| `updated_at`      | `timestamptz`    | Required; defaults to `now()`.                       |
| `status`          | `varchar(20)`    | Required; defaults to `active`.                      |

### `spaces`

Represents an individual or shared financial workspace that groups accounts and financial planning data.

| Column               | Type           | Rules                                                |
| -------------------- | -------------- | ---------------------------------------------------- |
| `id`                 | `bigserial`    | Primary key.                                         |
| `name`               | `varchar(100)` | Required.                                            |
| `type`               | `spaces_type`  | Required; `individual` or `shared`.                  |
| `created_by_user_id` | `bigint`       | Required foreign key to `users.id`; deletes cascade. |
| `created_at`         | `timestamptz`  | Required; defaults to `now()`.                       |

### `space_members`

Associates users with spaces and records their role. This is a many-to-many relationship between `users` and `spaces`.

| Column     | Type                | Rules                                                 |
| ---------- | ------------------- | ----------------------------------------------------- |
| `space_id` | `bigint`            | Required foreign key to `spaces.id`; deletes cascade. |
| `user_id`  | `bigint`            | Required foreign key to `users.id`; deletes cascade.  |
| `role`     | `space_member_role` | Required; `owner` or `member`, default `member`.      |

The composite primary key is (`space_id`, `user_id`), so a user can belong to a space only once.

### `space_accounts`

Associates accounts with spaces. It ensures an account can be used by a transaction in a specific space.

| Column       | Type     | Rules                                                   |
| ------------ | -------- | ------------------------------------------------------- |
| `space_id`   | `bigint` | Required foreign key to `spaces.id`; deletes cascade.   |
| `account_id` | `bigint` | Required foreign key to `accounts.id`; deletes cascade. |

The composite primary key is (`space_id`, `account_id`).

### `categories`

Represents a space-specific category used to classify transactions.

| Column       | Type           | Rules                                                 |
| ------------ | -------------- | ----------------------------------------------------- |
| `id`         | `bigserial`    | Primary key.                                          |
| `space_id`   | `bigint`       | Required foreign key to `spaces.id`; deletes cascade. |
| `name`       | `varchar(100)` | Required.                                             |
| `type`       | `varchar(50)`  | Required.                                             |
| `status`     | `varchar(50)`  | Required.                                             |
| `is_default` | `boolean`      | Required; defaults to `false`.                        |
| `created_at` | `timestamptz`  | Required; defaults to `now()`.                        |

The combination (`space_id`, `name`, `type`) is unique. Deleting a category sets the `category_id` of related transactions to `NULL`.

### `transactions`

Represents an income, expense, or transfer recorded against an account.

| Column         | Type               | Rules                                                              |
| -------------- | ------------------ | ------------------------------------------------------------------ |
| `id`           | `bigserial`        | Primary key.                                                       |
| `account_id`   | `bigint`           | Required; participates in the space-account foreign key.           |
| `space_id`     | `bigint`           | Required; participates in the space-account foreign key.           |
| `category_id`  | `bigint`           | Optional foreign key to `categories.id`; deletes set `NULL`.       |
| `reference_id` | `bigint`           | Optional reference, with no foreign key defined by the migrations. |
| `amount`       | `numeric(15, 2)`   | Required and greater than `0`.                                     |
| `type`         | `transaction_type` | Required; `expense`, `income`, or `transfer`.                      |
| `date`         | `date`             | Required; defaults to the current date.                            |
| `description`  | `text`             | Optional.                                                          |
| `created_at`   | `timestamptz`      | Required; defaults to `now()`.                                     |

The composite foreign key (`space_id`, `account_id`) references `space_accounts`, preventing an account from being used in a space where it is not linked.

### `budgets`

Represents a monthly budget for a space.

| Column       | Type          | Rules                                                 |
| ------------ | ------------- | ----------------------------------------------------- |
| `id`         | `bigserial`   | Primary key.                                          |
| `space_id`   | `bigint`      | Required foreign key to `spaces.id`; deletes cascade. |
| `month`      | `smallint`    | Required; must be between `1` and `12`.               |
| `year`       | `smallint`    | Required; must be at least `2000`.                    |
| `created_at` | `timestamptz` | Required; defaults to `now()`.                        |

The combination (`space_id`, `month`, `year`) is unique, allowing only one budget per space per month.

### `budget_categories`

Assigns a spending limit to a category within a budget.

| Column        | Type             | Rules                                                     |
| ------------- | ---------------- | --------------------------------------------------------- |
| `id`          | `bigserial`      | Primary key.                                              |
| `budget_id`   | `bigint`         | Required foreign key to `budgets.id`; deletes cascade.    |
| `category_id` | `bigint`         | Required foreign key to `categories.id`; deletes cascade. |
| `amount`      | `numeric(15, 2)` | Required and greater than `0`.                            |

The combination (`budget_id`, `category_id`) is unique.

### `savings_goals`

Represents a savings target belonging to a space.

| Column          | Type             | Rules                                                 |
| --------------- | ---------------- | ----------------------------------------------------- |
| `id`            | `bigserial`      | Primary key.                                          |
| `space_id`      | `bigint`         | Required foreign key to `spaces.id`; deletes cascade. |
| `name`          | `varchar(100)`   | Required.                                             |
| `target_amount` | `numeric(15, 2)` | Required and greater than `0`.                        |
| `target_date`   | `date`           | Optional.                                             |
| `created_at`    | `timestamptz`    | Required; defaults to `now()`.                        |

### `savings_goal_transactions`

Represents a contribution to or withdrawal from a savings goal.

| Column            | Type                       | Rules                                                        |
| ----------------- | -------------------------- | ------------------------------------------------------------ |
| `id`              | `bigserial`                | Primary key.                                                 |
| `savings_goal_id` | `bigint`                   | Required foreign key to `savings_goals.id`; deletes cascade. |
| `amount`          | `numeric(15, 2)`           | Required and greater than `0`.                               |
| `type`            | `savings_transaction_type` | Required; `contribution` or `withdrawal`.                    |
| `date`            | `date`                     | Required; defaults to the current date.                      |
| `description`     | `text`                     | Optional.                                                    |
| `created_at`      | `timestamptz`              | Required; defaults to `now()`.                               |

### `refresh_tokens`

Represents refresh-token sessions issued to users.

| Column       | Type          | Rules                                                  |
| ------------ | ------------- | ------------------------------------------------------ |
| `id`         | `bigserial`   | Primary key.                                           |
| `user_id`    | `bigint`      | Required foreign key to `users.id`; deletes cascade.   |
| `token_hash` | `text`        | Required and unique; stores a hash, not the raw token. |
| `expires_at` | `timestamptz` | Required.                                              |
| `created_at` | `timestamptz` | Required; defaults to `now()`.                         |
| `revoked_at` | `timestamptz` | Optional; set when the token is revoked.               |

An index exists on `user_id` to support user-token lookups.

## Query Guidelines

- Use Kysely through the shared `db` instance. Do not create a second connection pool in a service or controller.
- Select only the columns required by the operation. Never select or serialize `password_hash` or `token_hash` in API responses.
- Use indexed columns for frequent lookups. Primary keys, unique constraints, and the explicit `refresh_tokens.user_id` index are indexed by the current migrations; add a migration when a new access pattern needs an index.
- Use joins when they allow ownership or relationship checks to happen in the same query. The `transactions` composite foreign key protects the space-account relationship, but it does not replace authorization checks.
- Avoid unnecessary queries. Combine a record lookup with its ownership condition instead of retrieving the record first and checking ownership in application code.
- Use parameterized Kysely expressions. Never concatenate user input into SQL strings.
- Scope every space-owned query by an authorized `space_id`, and verify membership before reading or changing shared data.
- Use `numeric(15, 2)` values as exact monetary amounts. Do not use JavaScript floating-point arithmetic for persistence or comparisons.
- Use database transactions for multi-step changes, such as creating a budget and its category allocations or recording related financial changes together.
- Keep transaction boundaries short and commit only after all related writes succeed.
- Use `date` for financial dates and `timestamptz` for event or audit timestamps. Treat timestamps consistently as UTC at the application boundary.
- Use explicit ordering when returning lists; database row order is not guaranteed without `orderBy`.
- Use `limit` and `offset` or keyset pagination for potentially large result sets.
- Check affected-row counts for updates and deletes so a missing or unauthorized record is not reported as successfully changed.
- Prefer soft revocation (`revoked_at`) when invalidating refresh tokens; remove expired or revoked tokens only through an intentional cleanup process.

### Ownership-Safe Query

When retrieving user-owned data, include the ownership condition in the query. Do not retrieve a record by ID and assume that the caller owns it.

Conceptually, finding an expense should look like this:

```sql
SELECT transaction.id, transaction.amount, transaction.date, transaction.description
FROM transactions AS transaction
JOIN accounts AS account ON account.id = transaction.account_id
WHERE transaction.id = requested_id
  AND account.user_id = current_user_id
  AND transaction.type = 'expense';
```

The equivalent Kysely query keeps the ownership check in the database operation:

```ts
const expense = await db
  .selectFrom('transactions as transaction')
  .innerJoin('accounts as account', 'account.id', 'transaction.account_id')
  .select([
    'transaction.id',
    'transaction.amount',
    'transaction.date',
    'transaction.description',
  ])
  .where('transaction.id', '=', requestedId)
  .where('account.user_id', '=', currentUserId)
  .where('transaction.type', '=', 'expense')
  .executeTakeFirst();
```

### Typical Kysely List Query

```ts
const transactions = await db
  .selectFrom('transactions')
  .select(['id', 'amount', 'type', 'date', 'description'])
  .where('space_id', '=', spaceId)
  .where('date', '>=', startDate)
  .where('date', '<=', endDate)
  .orderBy('date', 'desc')
  .orderBy('id', 'desc')
  .execute();
```

For writes that must succeed or fail together, use a transaction:

```ts
await db.transaction().execute(async (transaction) => {
  await transaction
    .insertInto('budgets')
    .values(budget)
    .executeTakeFirstOrThrow();

  await transaction
    .insertInto('budget_categories')
    .values(categoryAllocations)
    .execute();
});
```

## Schema Changes

Before changing a table or column:

1. Check existing foreign keys.
2. Check dependent tables.
3. Check indexes.
4. Check application code using the column.
5. Check existing data.
6. Apply the change through a new migration.
7. Update the Kysely database types in `src/db/types`.
8. Update affected repositories, services, and tests.

Additional rules:

- Keep migrations ordered and forward-only; do not edit an already-applied migration to change live schema history.
- Define the required rollback in the migration's `down` function where the migration system supports it.
- Preserve existing data unless data removal is explicitly required and reviewed.
- Add or update foreign keys, unique constraints, check constraints, and indexes in the migration when they are part of the new invariant.
- Run `npm run migrate` against the target database and test both successful changes and expected constraint failures.
