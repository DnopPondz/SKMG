## 2024-05-01 - [NoSQL Injection via unvalidated Next.js Request Body]
**Vulnerability:** The `req.json()` body in Next.js API routes was being passed directly into Mongoose `findOne` and `create` queries, allowing attackers to inject query operators like `{"$ne": null}`.
**Learning:** Destructuring request bodies without type validation in Next.js does not guarantee string values. Attackers can send JSON objects that Mongoose interprets as query operators.
**Prevention:** Always parse and validate incoming JSON bodies with Zod before using the values in database queries, particularly for identifier fields like `sku`.
