
## 2024-05-24 - [Fix NoSQL Injection & Data Leakage in Stock API]
**Vulnerability:** The API endpoint `src/app/api/stock/route.ts` was taking the raw JSON request payload directly and passing fields like `sku` into `Product.findOne({ sku })`. Additionally, the endpoint leaked the error message string directly to the client `error.message`.
**Learning:** In Next.js routes (App Router), passing unvalidated `req.json()` data directly into mongoose can result in NoSQL injection as malicious payloads can be object operators instead of plain strings (e.g. `{"$ne": null}`). Using `error.message` on the fallback `catch (error: any)` object exposes sensitive database/system strings and stack details to users.
**Prevention:** Use Zod schemas to strict-parse all incoming API payloads (e.g., ensuring `sku` is a string). For generic failures, change `catch (error: any)` to `catch (_error)` and return static safe error messages such as `"An error occurred"`.
