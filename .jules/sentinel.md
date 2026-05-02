## 2024-05-24 - [Mass Assignment & NoSQL Injection in Product Creation]
**Vulnerability:** The API endpoint `src/app/api/products/add/route.ts` directly spread unvalidated JSON payload `req.json()` into `Product.create()`.
**Learning:** This exposes the application to NoSQL injections and Mass Assignments. In Next.js App Router, handling Mongoose queries without intermediate validation (e.g., Zod) directly invites malicious queries or prototype pollution into the database layer.
**Prevention:** Always enforce strict schema validation via libraries like Zod when parsing `req.json()` before passing to Mongoose queries or creations to ensure only intended fields and expected data types reach the database.
