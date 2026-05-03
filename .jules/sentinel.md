## 2026-05-03 - [Mass Assignment Risk in Product Creation]
**Vulnerability:** Direct unvalidated passage of user input into Mongoose `create()` and `findOne()` operations.
**Learning:** Found mass assignment vulnerabilities in `src/app/api/products/add/route.ts` and NoSQL injection risk in `src/app/api/stock/route.ts` because `await req.json()` was unpacked directly.
**Prevention:** Always use Zod schema validation to explicitly declare allowed fields before trusting user payload in MongoDB operations.
