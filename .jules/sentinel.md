## 2024-05-24 - [NoSQL Injection in Next.js App Router]
**Vulnerability:** Unvalidated `req.json()` payloads passed directly into Mongoose queries (e.g., `Product.findOne({ sku })`) in Next.js App Router API routes.
**Learning:** Destructuring directly from `req.json()` without type checking allows attackers to pass NoSQL query operators (like `{"$ne": null}`) instead of expected strings, bypassing simple equality checks.
**Prevention:** Always use a validation library like `zod` to strictly validate and type-cast the payload structure from `req.json()` before passing it into Mongoose queries. Never pass raw user input objects to Mongoose.
