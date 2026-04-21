## 2024-05-18 - [NoSQL Injection in Next.js API Routes]
**Vulnerability:** Passing unvalidated req.json() payloads directly into Mongoose queries (e.g., findOne) in Next.js App Router introduces NoSQL injection risks.
**Learning:** Attackers can send query operator objects like {"$ne": null} instead of strings, bypassing intended logic if the input isn't validated.
**Prevention:** Use Zod to enforce string types and validate all API inputs before using them in database queries.
