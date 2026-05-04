## 2026-03-30 - Prevent NoSQL Injection in App Router API Routes
**Vulnerability:** Unvalidated payload `req.json()` was passed directly to Mongoose query (`Product.findOne({ sku })`), introducing NoSQL injection risks.
**Learning:** Next.js App Router API routes directly handle JSON payloads, which bypass typical middleware validations if not explicitly checked, exposing database queries to injection and mass assignment.
**Prevention:** Always define rigorous input schemas using `zod` and use `.safeParse()` to validate input parameters before utilizing them in any downstream operations like database queries.
