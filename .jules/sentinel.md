## 2024-05-15 - [NoSQL Injection Risk in Next.js App Router API Routes]
**Vulnerability:** Passing unvalidated `req.json()` payloads directly into Mongoose queries (e.g., `findOne`) introduces NoSQL injection risks.
**Learning:** Next.js App Router parses JSON bodies into native JS objects, allowing attackers to send query operators like `{"$ne": null}`.
**Prevention:** Use a validation library like Zod to strictly type and validate all API inputs (e.g. enforce that `sku` is a string) before passing them to the database.
