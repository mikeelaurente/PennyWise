# PennyWise Backend Modules

## Authentication

- [x] Register
  - [x] `POST /api/auth/register`
  - [x] Controller: `registerUser`
  - [x] Service: `registerUser`
  - [x] Validation: `registerSchema`
- [x] Login
  - [x] `POST /api/auth/login`
  - [x] Controller: `logInUser`
  - [x] Service: `loginUser`
  - [x] Validation: `loginUserSchema`
- [x] Get current user
  - [x] `GET /api/auth/me`
  - [x] Authentication middleware: `isAuthenticated`
  - [x] Controller: `getCurrentUser`
- [ ] Logout and token revocation

## Financial Accounts

- [x] Create account
  - [x] `POST /api/accounts`
  - [x] Authentication middleware: `isAuthenticated`
- [x] List accounts
  - [x] `GET /api/accounts`
  - [x] Authentication middleware: `isAuthenticated`
- [x] View account
  - [x] `GET /api/accounts/:id`
  - [x] Authentication middleware: `isAuthenticated`
- [x] Update account details
  - [x] `PATCH /api/accounts/:id`
  - [x] Authentication middleware: `isAuthenticated`
- [x] Update account status
  - [x] `PATCH /api/accounts/:id/status`
  - [x] Authentication middleware: `isAuthenticated`
- [ ] Associate account with a Space
- [ ] Calculate balance from transactions
- [ ] View account transactions

## Spaces

- [ ] Create Space
- [ ] List available Spaces
- [ ] View or switch active Space
- [ ] Invite member
- [ ] Join Space
- [ ] Manage members and roles
- [ ] Leave Space
- [ ] Add existing account to Space
- [ ] Remove account from Space

## Categories

- [ ] List categories
- [ ] Create category
- [ ] Update category
- [ ] Archive category
- [ ] Seed default categories
- [ ] Prevent deletion of referenced categories

## Transactions

- [ ] Create income transaction
- [ ] Create expense transaction
- [ ] Create transfer
- [ ] View transaction
- [ ] Update transaction
- [ ] Delete transaction
- [ ] List transaction history
- [ ] Search and filter transactions
- [ ] Validate account and Space membership

## Budgets

- [ ] Create monthly budget
- [ ] Set category limits
- [ ] View budget progress
- [ ] Compare planned and actual spending
- [ ] Enforce one budget per Space and month

## Savings Goals

- [ ] Create savings goal
- [ ] View savings goal
- [ ] Update savings goal
- [ ] Add contribution
- [ ] Record withdrawal
- [ ] View goal progress

## Dashboard

- [ ] View Space-scoped balance overview
- [ ] View income and expense summary
- [ ] View recent transactions
- [ ] View spending by category
- [ ] View budget overview
- [ ] View savings goal overview

## Analytics

- [ ] View spending trends
- [ ] View category analytics
- [ ] View member analytics for shared Spaces
