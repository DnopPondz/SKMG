## 2024-04-17 - Prevent NoSQL Injection from Unvalidated req.json()
**Vulnerability:** Passing unvalidated payloads from `req.json()` directly into Mongoose queries (e.g., `Product.findOne({ sku })`) allowed for NoSQL injection. If an attacker sent an object like `{"sku": {"$ne": null}}`, Mongoose could return a record without matching a real SKU string.
**Learning:** Destructuring JSON directly from requests into database queries in Next.js API Routes is a critical vector for injection when using MongoDB/Mongoose.
**Prevention:** Use Zod or a similar validation library to strictly enforce that all query parameters are primitives (like string or number) before passing them to the database.
