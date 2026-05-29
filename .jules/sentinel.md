## 2024-05-18 - NoSQL Injection via unvalidated input to findOne
**Vulnerability:** Found `req.json()` data directly being used in a Mongoose query (`Product.findOne({ sku })`). This permitted malicious injection via passing objects rather than strings as input.
**Learning:** `req.json()` must be parsed and strictly validated before database querying, especially when checking dynamically generated properties.
**Prevention:** Use `zod` object schemas, specifically `safeParse()`, to tightly constrain incoming request body data to strings, enum types, and expected numbers. Avoid assigning the raw request data to variables directly. Always validate inputs!
