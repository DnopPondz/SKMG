## 2025-02-24 - [NoSQL Injection in Next.js API Routes]
**Vulnerability:** Passing unvalidated `req.json()` payloads directly into Mongoose queries (e.g., `Product.findOne({ sku })`) introduces NoSQL injection risks. Attackers can send query operator objects like `{"$ne": null}`.
**Learning:** In Next.js App Router API routes, request bodies are parsed dynamically without schema validation by default, allowing arbitrary JSON objects to pass through as properties intended to be scalar strings.
**Prevention:** Use Zod (`safeParse`) or a similar library to explicitly enforce strict string types on all API inputs before querying the database.
