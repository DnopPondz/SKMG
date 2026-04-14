## 2024-05-18 - [CRITICAL] NoSQL Injection in Stock API via Unvalidated Input
**Vulnerability:** The `/api/stock` endpoint extracted fields directly from `req.json()` and passed `sku` into `Product.findOne({ sku })` without validation. Attackers could send objects like `{"$ne": null}` to bypass exact matching.
**Learning:** Next.js App Router API handlers do not automatically validate JSON payloads. Mongoose queries will accept query operator objects if the field type is not strictly enforced.
**Prevention:** Always use a validation library like Zod to parse `req.json()` and ensure all fields are primitive types (e.g., strings, numbers) before passing them to Mongoose query objects.
