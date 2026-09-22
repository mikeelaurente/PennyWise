# PennyWise — Core Features

## 1. User Authentication & Account

### Description

PennyWise allows users to create an account and securely access their financial data.

### Core Features

- User registration
- User login/logout
- Secure password storage
- User profile information
- Session/authentication management

### Business Rules

- Each user must have a unique email address.
- A user can own multiple financial accounts.
- A user can belong to multiple Spaces.

### MVP Scope

**Included**

- Register
- Login
- Logout
- Basic profile

**Out of Scope**

- Social login
- Multi-factor authentication
- Advanced account recovery

---

# 2. Personal & Shared Spaces

### Description

A **Space** is a financial workspace where users organize and track financial activity.
A Space can be personal or shared.

### Examples

**Personal Space**

> Mikee Personal

**Shared Space**

> Mikee & Tan

### Core Features

- Create a Space
- View available Spaces
- Switch between Spaces
- Invite users to a Space
- Join a Space
- Manage Space members
- Leave a Space

### Business Rules

- A Space has one or more members.
- The creator of a Space is its owner.
- A Space has two roles:
  - Owner
  - Member
- Members can manage financial data within the Space.
- The owner manages Space-level settings and membership.
- A Shared Space does not require a joint bank account.

### Important Concept

> **Space = financial context, not ownership of money.**

A Shared Space can track:
Mikee GCash
Tan GCash

without treating those accounts as jointly owned.

### MVP Scope

**Included**

- Personal Space
- Shared Space
- Space selector
- Create Space
- Invite/join Space
- Owner/member roles

**Out of Scope**

- Complex permissions
- Teams/departments
- Approval workflows
- Chat/messaging
- Notifications

---

# 3. Financial Account Management

### Description

Users can add the real-world accounts where their money is held.
Examples:

- GCash
- Maya
- BPI
- Bank accounts
- Cash

### Core Features

- Add account
- View account
- Edit account
- View account balance
- Archive account
- View account transactions

### Business Rules

- Each account belongs to exactly one user.
- An account represents one real-world source of money.
- An account can be available in multiple Spaces.
- Adding an account to a Space does not transfer ownership.
- An account must not be duplicated simply because it is used in multiple Spaces.
- Current balance is derived from the initial balance and transactions.

### Example

Mikee
└── GCash
     ├── Mikee Personal
     └── Mikee & Tan

Both Spaces refer to the **same GCash account**.

### MVP Scope

**Included**

- Manual account creation
- Starting/initial balance
- Account types
- Account balance
- Archive account
- Add account to a Space

**Out of Scope**

- Bank API integrations
- Automatic balance synchronization
- Bank transaction imports
- Credit score tracking

---

# 4. Transaction Management

### Description

Transactions record financial events that affect an account within a specific Space.

### Transaction Types

- Expense
- Income
- Transfer

### Core Features

- Add transaction
- Edit transaction
- Delete transaction
- View transaction history
- Search transactions
- Filter transactions
- Categorize transactions
- Associate transactions with an account
- Associate transactions with a Space

### Transaction Information

A transaction can contain:
Amount
Type
Date
Description
Account
Space
Category

### Business Rules

- Every transaction belongs to exactly one account.
- Every transaction belongs to exactly one Space.
- The account must be available in that Space.
- The category must belong to that Space.
- Expenses decrease account balance.
- Income increases account balance.
- Transfers move money between accounts.

### Shared Space Example

Mikee GCash
    ↓
Shared Space
    ↓
Groceries — ₱2,000
    Paid by Mikee

The transaction affects the **actual GCash balance**, while appearing only in the Shared Space's financial activity.

### MVP Scope

**Included**

- Expense
- Income
- Basic transfers
- Transaction history
- Search/filter
- Categories

**Out of Scope**

- Receipt OCR
- Automatic categorization
- Bank imports
- Recurring transactions
- AI transaction classification

---

# 5. Category Management

### Description

Categories organize transactions so users can understand where their money goes.

### Example Categories

**Expenses**

- Food
- Transportation
- Bills
- Shopping
- Entertainment
- Health
- Subscriptions
- Other

**Income**

- Salary
- Freelance
- Business
- Other

### Business Rules

- Categories belong to a Space.
- Members of the Space can use its categories.
- Expense categories are used for expenses.
- Income categories are used for income.
- Categories should not be deleted if they are referenced by historical transactions.

### Core Features

- View categories
- Create category
- Edit category
- Archive category

### MVP Scope

**Included**

- Default categories
- Custom categories
- Expense/income category types

**Out of Scope**

- AI-generated categories
- Automatic categorization
- Category sharing between unrelated Spaces

---

# 6. Budget Management

### Description

Budgets allow users to define how much they plan to spend within each category during a month.

### Example

September Budget

Food              ₱5,000
Transportation    ₱2,500
Bills             ₱8,000
Shopping          ₱2,000
Entertainment     ₱1,500

### Core Features

- Create monthly budget
- Set category limits
- View budget progress
- Compare planned vs actual spending
- View remaining budget

### Business Rules

- A budget belongs to one Space.
- A Space can have at most one budget per month.
- Budgets are optional.
- Budget amounts represent planned spending.
- Actual spending is calculated from transactions.
- Budget progress is not stored as a separate balance.

### Example

Food Budget
₱5,000

Spent
₱3,200

Remaining
₱1,800

### MVP Scope

**Included**

- Monthly budgets
- Category budgets
- Budget progress
- Planned vs actual spending

**Out of Scope**

- Yearly budgets
- Budget rollover
- Envelope budgeting
- Automatic budget recommendations
- AI financial advice

---

# 7. Savings Goals

### Description

Savings Goals allow users to track progress toward a financial target.

### Examples

Vacation
Target: ₱30,000

Emergency Fund
Target: ₱50,000

New Laptop
Target: ₱60,000

### Core Features

- Create savings goal
- Set target amount
- Set target date
- Add contribution
- Record withdrawal
- View progress

### Business Rules

- A savings goal belongs to a Space.
- A Space can have multiple savings goals.
- Progress is calculated from contributions and withdrawals.
- A savings goal is a tracking mechanism and is not itself a bank account.
- Savings goal transactions do not automatically change account balances in the MVP.

### Example

Vacation

Target       ₱30,000
Saved        ₱12,000
Remaining    ₱18,000
Progress     40%

### MVP Scope

**Included**

- Savings goals
- Contributions
- Withdrawals
- Progress tracking
- Target date

**Out of Scope**

- Automatic transfers
- Bank-linked savings
- Interest calculations
- Investment tracking

---

# 8. Dashboard

### Description

The Dashboard provides a high-level overview of the currently selected Space.

### Core Information

The Dashboard should answer:

> **How much money are we tracking?**

> **How much did we spend?**

> **Where did the money go?**

> **How are we doing against our budget?**

> **What are we saving for?**

### Core Components

- Total tracked account balance
- Income
- Expenses
- Net cash flow
- Spending overview
- Spending by category
- Recent transactions
- Accounts
- Budget overview
- Savings goal progress

### Important Rule

The Dashboard should always reflect the **currently selected Space**.
For example:
Mikee Personal

shows personal financial activity.
Switch to:
Mikee & Tan

and the dashboard shows shared financial activity.

### MVP Scope

**Included**

- Balance overview
- Income/expense summary
- Recent transactions
- Account overview
- Spending by category
- Budget overview
- Savings goal overview

---

# 9. Analytics & Insights

### Description

Analytics help users understand their financial behavior using data already stored in PennyWise.

### Core Analytics

#### Spending

- Spending by category
- Spending trends
- Monthly spending

#### Income vs Expenses

- Total income
- Total expenses
- Net cash flow

#### Accounts

- Account balances
- Account activity

#### Shared Spaces

- Spending by member
- Member contribution/activity
- Shared spending trends

### Example Insight

> "Food was your highest spending category this month."

Or:

> "You spent ₱2,000 less than last month."

### Business Rules

- Analytics are derived from transactions and other existing data.
- Analytics should not require separate analytics tables for the MVP.
- Analytics should respect the currently selected Space.

### MVP Scope

**Included**

- Basic charts
- Category breakdown
- Income vs expenses
- Spending trends
- Basic shared-space member analytics

**Out of Scope**

- AI financial advisor
- Financial forecasting
- Investment analytics
- Predictive modeling

---

# 10. Space Account Sharing

### Description

Allows a user's existing financial account to be used within multiple Spaces without creating duplicate accounts.

### Example

Mikee GCash
     │
     ├── Mikee Personal
     │      └── Coffee ₱200
     │
     └── Mikee & Tan
            └── Groceries ₱2,000

### Business Rules

- An account has one owner.
- An account can be connected to multiple Spaces.
- Transactions remain associated with the real account.
- Each transaction belongs to one Space.
- Account balance includes all transactions affecting that account, regardless of Space.
- Space analytics only include transactions belonging to that Space.

### Why This Matters

This prevents PennyWise from treating:
Mikee GCash in Personal Space

and
Mikee GCash in Shared Space

as two different accounts.

---

# Core Product Rules

These rules should guide the entire application.

### Rule 1 — Accounts represent real money

An account represents an actual place where money exists.
GCash
BPI
Maya
Cash

---

### Rule 2 — Spaces represent financial context

A Space determines **where the financial activity is being tracked**.
Mikee Personal
Mikee & Tan

---

### Rule 3 — An account can exist in multiple Spaces

An account is not duplicated just because it is used in multiple financial contexts.

---

### Rule 4 — Transactions belong to a Space

A transaction answers:

> "What happened, to which account, and in which financial context?"

---

### Rule 5 — Account balance and Space activity are different

**Account balance:**

> How much money is actually in this account?

**Space activity:**

> What financial activity happened in this Space?

These should never be treated as the same concept.

---

### Rule 6 — Budgets belong to Spaces

A budget represents the spending plan for a particular financial context.

---

### Rule 7 — Categories belong to Spaces

Each Space can have its own financial categories.

---

### Rule 8 — Analytics are derived

Analytics should be calculated from existing financial data rather than stored separately.

---

# MVP Feature Summary

| **Feature**                        | **MVP** |
| ---------------------------------- | ------- |
| User Authentication                | ✅      |
| Personal Spaces                    | ✅      |
| Shared Spaces                      | ✅      |
| Space Members                      | ✅      |
| Space Switching                    | ✅      |
| Accounts                           | ✅      |
| Account Sharing Across Spaces      | ✅      |
| Transactions                       | ✅      |
| Categories                         | ✅      |
| Monthly Budgets                    | ✅      |
| Savings Goals                      | ✅      |
| Dashboard                          | ✅      |
| Basic Analytics                    | ✅      |
| Bank Integrations                  | ❌      |
| Receipt OCR                        | ❌      |
| AI Financial Advisor               | ❌      |
| Investments                        | ❌      |
| Crypto                             | ❌      |
| Complex Permissions                | ❌      |
| Expense Splitting / Reimbursements | ❌      |
| Advanced Notifications             | ❌      |

# PennyWise Core Concept

> **PennyWise is a personal and shared finance tracker where users manage real-world financial accounts and organize their financial activity into personal or shared Spaces.**

The architecture can be summarized as:
USER
 │
 ├── owns ──→ ACCOUNTS
 │
 └── belongs to ──→ SPACES
                       │
                       ├── MEMBERS
                       ├── ACCOUNT ACCESS
                       ├── CATEGORIES
                       ├── TRANSACTIONS
                       ├── BUDGETS
                       └── SAVINGS GOALS

The most important relationship is:
REAL MONEY
   ↓
ACCOUNT
   ↓
can be tracked in
   ↓
SPACE
   ↓
produces
   ↓
TRANSACTIONS
   ↓
powers
   ↓
BUDGETS + SAVINGS + ANALYTICS
