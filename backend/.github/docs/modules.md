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
- [x] Logout and token revocation

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
- [x] Associate account with a Space
  - [x] `POST /api/spaces/:id/accounts/:accountId`
  - [x] Account ownership and space membership validation
- [x] Remove account from a Space
  - [x] `DELETE /api/spaces/:id/accounts/:accountId`
- [ ] Calculate balance from transactions
- [ ] View account transactions

## Spaces

- [x] Create Space
  - [x] `POST /api/spaces`
  - [x] Owner membership is created atomically
- [x] List available Spaces
  - [x] `GET /api/spaces`
  - [x] Search, type filter, and pagination
- [x] View or switch active Space
  - [x] `GET /api/spaces/:id`
  - [x] Active-space switching is client state
- [x] Add member by user ID
  - [x] `POST /api/spaces/:id/members`
  - [ ] Token-based invitation workflow
- [x] Join Space
  - [x] `POST /api/spaces/:id/join`
- [x] Manage members and roles
  - [x] `PATCH /api/spaces/:id/members/:userId`
  - [x] `DELETE /api/spaces/:id/members/:userId`
- [x] Leave Space
  - [x] `POST /api/spaces/:id/leave`
- [x] Add existing account to Space
  - [x] `POST /api/spaces/:id/accounts/:accountId`
- [x] Remove account from Space
  - [x] `DELETE /api/spaces/:id/accounts/:accountId`

## Categories

- [x] List categories
  - [x] `GET /api/categories?spaceId=:spaceId`
  - [x] Search, type filter, and pagination
  - [x] Authentication middleware: `isAuthenticated`
- [x] Create category
  - [x] `POST /api/categories`
  - [x] Space membership validation
  - [x] Duplicate category conflict handling
- [x] View category
  - [x] `GET /api/categories/:id`
  - [x] Space membership validation
- [x] Update category
  - [x] `PATCH /api/categories/:id`
  - [x] Duplicate category conflict handling
- [x] Delete category
  - [x] `DELETE /api/categories/:id`
  - [x] Transaction references are set to `NULL` by the database
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
