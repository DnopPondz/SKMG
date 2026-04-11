## 2026-03-30 - [NoSQL Injection & Business Logic Bypass via req.json() in Mongoose]
**Vulnerability:** Found unvalidated `req.json()` data directly passed into Mongoose `findOne()` and arithmetic operations in `api/stock/route.ts`.
**Learning:** In Next.js App Router, `req.json()` can return any valid JSON object. When directly passed to `Product.findOne({ sku })`, an attacker can send `{"sku": {"$ne": null}}` which executes as a Mongoose query operator, causing NoSQL injection. Furthermore, lacking validation on numbers allows negative values to bypass logical bounds checking.
**Prevention:** Always validate API request payloads with a schema validation library like `zod` before using them in database queries or business logic calculations.
