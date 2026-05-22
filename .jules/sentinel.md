## 2024-05-18 - [Fix NoSQL Injection in API Route]
**Vulnerability:** Unvalidated user input (req.json) was being passed directly to `Product.findOne({ sku })` and used for subsequent database operations in Next.js App Router API.
**Learning:** Next.js Route Handlers parsing JSON input implicitly type as `any`, leaving database operations vulnerable to NoSQL injection and mass assignment if not explicitly validated. In addition, error blocks returning `error.message` leaked internal details.
**Prevention:** Use Zod validation schemas (`safeParse`) at the boundaries to strict-type input payloads before querying Mongoose models, and explicitly return generic 500 status messages in `catch` blocks without exposing error objects.
