# Architecture

## Overview

This project uses a layered backend architecture built with Express, TypeScript, Kysely, and PostgreSQL.

The primary request flow is:

```text
Client
  ↓
Route
  ↓
Middleware
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Kysely
  ↓
PostgreSQL
```

The purpose of the layers is to keep HTTP handling, business logic, and database access separated.

---

## Layers

### 1. Route Layer

Responsible for defining API endpoints.

Example:

```text
POST /api/expenses
GET /api/expenses
GET /api/expenses/:id
PATCH /api/expenses/:id
DELETE /api/expenses/:id
```

Routes may attach middleware such as:

- Authentication
- Authorization
- Request validation

Routes should not contain business logic.

---

### 2. Middleware Layer

Middleware handles cross-cutting concerns.

Examples:

```text
Authentication
Authorization
Request validation
Error handling
Logging
```

Authentication determines whether the request has a valid authenticated user.

Authorization determines whether the authenticated user is allowed to perform the requested operation.

---

### 3. Controller Layer

The controller is responsible for HTTP-specific operations.

Responsibilities:

```text
Request
  ↓
Extract input
  ↓
Validate input
  ↓
Call service
  ↓
Return response
```

Controllers should remain thin.

Avoid:

```text
Controller
    ↓
Complex business logic
    ↓
Database queries
```

Prefer:

```text
Controller
    ↓
Service
    ↓
Repository
```

---

### 4. Service Layer

The service contains business logic.

Example:

```text
createExpense()
    ↓
Check account ownership
    ↓
Check category
    ↓
Validate business rules
    ↓
Create expense
    ↓
Return result
```

Services may coordinate multiple repositories.

If several database operations must succeed together, use a database transaction.

---

### 5. Repository Layer

Repositories are responsible for database access.

Example responsibilities:

```text
findUserByEmail()
createUser()
findExpenseById()
createExpense()
updateExpense()
deleteExpense()
```

Repositories should not decide whether an operation is allowed from a business perspective.

For example:

```text
Repository:
"Find account by ID."

Service:
"Does this account belong to the current user?"
```

---

### 6. Database Layer

Kysely provides the database query interface.

The database is PostgreSQL.

Database-specific concerns should remain close to the repository/database layer.

---

## Module Structure

Features should be organized by domain where possible. The backend currently uses the following structure:

```text
src/
├── config/
│   └── env.ts
├── db/
│   ├── index.ts
│   ├── migrate.ts
│   ├── migrations/
│   ├── repositories/
│   │   ├── accounts.ts
│   │   ├── categories.ts
│   │   ├── refreshToken.ts
│   │   └── users.ts
│   └── types/
├── middleware/
│   └── authorization.middleware.ts
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.routes.ts
│   │   ├── auth.schema.ts
│   │   └── auth.service.ts
│   ├── accounts/
│   │   ├── account.controller.ts
│   │   ├── account.routes.ts
│   │   ├── account.schema.ts
│   │   └── account.service.ts
│   ├── categories/
│   │   ├── category.controller.ts
│   │   ├── category.routes.ts
│   │   ├── category.schema.ts
│   │   └── category.service.ts
│   └── spaces/
│       └── space.schema.ts
├── routes.ts
├── shared/
│   ├── schema/
│   ├── types/
│   └── utils/
├── app.ts
└── server.ts
```

### Domain Organization Rules

- Add HTTP-facing features under `src/modules/<domain>/`.
- Follow the existing file naming pattern: `<domain>.controller.ts`, `<domain>.routes.ts`, `<domain>.schema.ts`, and `<domain>.service.ts`.
- Keep shared repositories under `src/db/repositories/` and shared database types under `src/db/types/`.
- Use `src/shared/schema/` for reusable validation schemas, `src/shared/types/` for shared TypeScript declarations, and `src/shared/utils/` for cross-cutting helpers.
- Register new module routers in `src/routes.ts`.
- Keep database migrations in `src/db/migrations/`; do not place migration files inside a feature module.
- Categories and spaces currently have schema/module groundwork, while transactions, budgets, and savings goals currently have database migrations and types but do not yet have complete module implementations.

---

## Data Flow

For a typical create operation:

```text
POST /expenses
       ↓
Route
       ↓
Authentication Middleware
       ↓
Validation
       ↓
Expense Controller
       ↓
Expense Service
       ↓
Expense Repository
       ↓
Kysely
       ↓
PostgreSQL
       ↓
Repository
       ↓
Service
       ↓
Controller
       ↓
HTTP Response
```

---

## Error Handling

Errors should be handled consistently.

A service should communicate meaningful application errors.

The controller should translate application results/errors into appropriate HTTP responses.

Avoid exposing:

- Database credentials
- Internal stack traces
- Sensitive user information
- Raw database errors to clients

---

## Transactions

Use a database transaction when multiple operations must be atomic.

Example:

```text
BEGIN
   ↓
Create expense
   ↓
Update account balance
   ↓
Create related record
   ↓
COMMIT
```

If one required operation fails:

```text
ROLLBACK
```

The service layer should generally coordinate transaction-level business operations.

---

## Design Principle

Prefer:

```text
Simple
Predictable
Testable
Maintainable
```

over unnecessary abstractions or overly complex patterns.
