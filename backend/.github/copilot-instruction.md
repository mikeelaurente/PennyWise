# Copilot Instructions

## Project Overview

This is a backend application built with:

- Node.js
- Express
- TypeScript
- Kysely
- PostgreSQL
- Zod
- Jest

Follow the existing project structure and coding patterns before introducing new patterns.

Read these documents before implementing domain or schema changes:

- `.github/docs/business-rules.md` for application behavior, ownership, authorization, and financial rules.
- `.github/docs/database.md` for PostgreSQL schema, migrations, query practices, and schema-change workflow.

Current implementation status:

- Authentication and financial-account CRUD are implemented.
- Spaces, categories, transactions, budgets, and savings goals have database migrations and Kysely types but are not yet fully exposed through routes and services.
- Do not describe a planned rule as implemented unless the backend enforces it and tests cover it.

---

## General Rules

- Use TypeScript.
- Use `async/await` for asynchronous operations.
- Use single quotes for strings.
- Prefer clear and descriptive variable and function names.
- Avoid unnecessary abstractions.
- Do not introduce new dependencies unless explicitly requested or clearly necessary.
- Do not modify unrelated files.
- Reuse existing utilities, types, middleware, and patterns when appropriate.
- Keep implementations simple and maintainable.
- Do not invent business requirements when they are not specified.

---

## Architecture

Follow this general flow:

```text
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

### Controller

Controllers should:

- Receive the HTTP request.
- Extract and validate request data.
- Call the appropriate service.
- Return the HTTP response.
- Handle HTTP-specific concerns.

Controllers should not contain complex business logic or direct database queries.

### Service

Services should:

- Contain business logic.
- Coordinate multiple repositories when necessary.
- Perform business-level validation.
- Handle transactions when multiple database operations must succeed or fail together.

### Repository

Repositories should:

- Handle database access.
- Use Kysely for queries.
- Avoid business logic.
- Return database/domain data to the service layer.

### Routes

Routes should:

- Define HTTP endpoints.
- Attach middleware.
- Connect routes to controllers.

---

## Validation

Use Zod for request validation.

Validate:

- Request body
- Query parameters
- Route parameters

Do not rely only on database errors for input validation.

---

## Database

Use Kysely for database operations.

Do not write raw SQL in repositories or services unless:

1. Kysely cannot reasonably express the operation, or
2. Raw SQL is explicitly requested.

Raw SQL is allowed in migrations when PostgreSQL-specific types, constraints, or expressions require it.

Always consider:

- Foreign keys
- Nullability
- Unique constraints
- Transactions
- Data ownership
- Query performance

---

## HTTP Status Codes

Use appropriate HTTP status codes for the operation:

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
500 Internal Server Error
```

Use `409 Conflict` for conflicts such as attempting to create a duplicate account, registering an existing email, reopening a closed account, or changing an initial balance after transactions exist. Do not convert every database error into `409`.

---

## CRUD Convention

For a standard CRUD resource, follow this structure:

```text
Entity
├── schema
├── repository
├── service
├── controller
├── routes
└── tests
```

Typical endpoints, when the resource supports the operation:

```text
POST   /resource
GET    /resource
GET    /resource/:id
PATCH  /resource/:id
DELETE /resource/:id
```

Do not add an endpoint just to complete CRUD. Follow the business rules for whether a resource should be deleted, archived, revoked, or updated instead. Before creating a new resource implementation, inspect an existing module and follow its conventions.

---

## Testing

Use Jest for tests.

Tests should cover:

- Successful operations
- Validation failures
- Authentication failures
- Authorization failures
- Missing records
- Duplicate records
- Database failures
- Important business-rule edge cases

Do not only test the happy path.

---

## AI Behavior

### When asked to create CRUD

Inspect the existing project structure and reference implementations first.

Follow existing:

- Naming conventions
- File structure
- Error handling
- Response format
- Validation style
- Repository style
- Test style

Do not redesign the architecture unless explicitly requested.

### When asked to debug

First identify:

1. The error
2. The root cause
3. The affected code
4. Why the error occurs
5. The smallest appropriate fix

Avoid rewriting unrelated code.

### When asked to review code

Check:

- Correctness
- Security
- Validation
- Authorization
- Database queries
- Error handling
- Performance
- Maintainability
- Architectural consistency
- Edge cases

Rank important issues by severity.

### When requirements are unclear

Do not invent business rules.

Ask for clarification when the ambiguity could change the implementation.

### When implementing a feature

Before changing code:

1. Inspect relevant existing files.
2. Identify existing patterns.
3. Determine affected files.
4. Implement the smallest coherent change.
5. Run or update relevant tests.
6. Report what changed.
7. Report any assumptions made.
