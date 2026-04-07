## 2026-03-30 - [Missing Password Hashing & Incorrect Route]
**Vulnerability:** The registration API route (`src/app/api/register/route.ts`) was completely missing and replaced by `ProductSchema`, which meant any implementation would either fail or not securely hash passwords if implemented naively.
**Learning:** Always ensure the registration endpoint properly hashes passwords before storing them in the database, and verify that API routes actually contain route handlers (`GET`, `POST`, etc.) instead of unrelated logic like Mongoose schemas.
**Prevention:** Implement strict code review for auth-related routes. Use libraries like `bcryptjs` and enforce password hashing via pre-save hooks on the `User` model or within the registration API handler itself.
