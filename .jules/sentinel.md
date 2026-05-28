## Sentinel Journal

## 2024-05-28 - NoSQL Injection and Mass Assignment in Next.js App Router
**Vulnerability:** Passing unvalidated `req.json()` payloads directly into Mongoose queries (e.g., `findOne`) or create operations in Next.js App Router introduces mass assignment and NoSQL injection risks.
**Learning:** In `src/app/api/products/add/route.ts`, the endpoint passed raw data from `req.json()` directly to `Product.create()`. It also exposed `error.message` on 500 errors, potentially leaking internal details.
**Prevention:** Use Zod `safeParse()` to validate inputs and use the resulting parsed `data` object instead of raw inputs. For validation errors, return a generic message instead of raw validation error details. In catch blocks, remove the `error` parameter and return a generic "Internal server error" to avoid information leakage.