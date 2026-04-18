## 2024-05-24 - NoSQL Injection via Next.js req.json() Payload
**Vulnerability:** Passing unvalidated `req.json()` payloads directly into Mongoose queries (e.g., `Product.findOne({ sku })`) in Next.js App Router exposes the application to NoSQL injection.
**Learning:** Attackers can send query operator objects like `{"$ne": null}` instead of string IDs. If Mongoose receives this object without type checking, it executes the query using the operator, potentially bypassing intended logic (like fetching the first arbitrary record).
**Prevention:** Always use a validation library like Zod to strictly parse and type-check incoming `req.json()` payloads before passing any fields to Mongoose queries. Enforce string types for keys like `sku` and `id`.
