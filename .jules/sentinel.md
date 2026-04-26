## 2024-04-26 - [NoSQL Injection in Next.js App Router endpoints]
**Vulnerability:** Directly calling `await req.json()` and using the destructured fields (like `sku`) directly into `Product.findOne({ sku })` introduces a critical NoSQL Injection vulnerability.
**Learning:** Next.js App Router parses the JSON body into objects. Without strict schema validation, attackers can pass MongoDB query operators such as `{"$ne": null}`.
**Prevention:** Always use Zod or a similar strict schema validation library to validate the request body before using it in database queries.
