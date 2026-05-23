
## 2024-05-18 - [Fix API Data Validation and Error Handling Leakage]
**Vulnerability:** API routes (`src/app/api/products/add/route.ts` and `src/app/api/stock/route.ts`) accepted raw, unvalidated `req.json()` data directly into Mongoose queries and object creation. Also, the catch blocks were exposing `error.message` on failures to the client.
**Learning:** Directly passing unvalidated inputs to Mongoose causes a risk of NoSQL injection and mass assignment. Additionally, `error.message` could leak internal server information or stack trace details, violating secure error handling practices.
**Prevention:** Always use Zod `safeParse()` schemas to explicitly validate incoming payload structures and strip unexpected properties. Always use generic error messages (e.g., "Internal server error") in default catch block responses to prevent data leakage.
