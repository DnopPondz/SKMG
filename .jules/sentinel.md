## 2024-04-25 - [Fix NoSQL Injection & Input Validation in API Routes]
**Vulnerability:** API routes parsing raw unvalidated `req.json()` payloads and passing them directly into Mongoose queries, causing NoSQL injection risks. Error blocks returning `error.message` on error.
**Learning:** In Next.js App Router API endpoints, input validation and type checking wasn't enforced. Unhandled error messages could leak sensitive database or application details.
**Prevention:** Implement `zod` for request parsing and schema validation to enforce primitive types, specifically guaranteeing ID properties are strings instead of objects that might contain query operators like `$ne`. Ensure all API error responses return generic responses (e.g. `Internal Server Error`).
