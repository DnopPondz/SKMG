## 2026-05-12 - [Mass Assignment Risk in Next.js App Router]
**Vulnerability:** Mass assignment and potential NoSQL injection risks by passing unvalidated `req.json()` directly into Mongoose `create()` operations.
**Learning:** Found that Next.js API routes directly accepting `req.json()` without a validation layer pose a security threat where users could insert arbitrary fields (like bypassing roles or manipulating internal fields).
**Prevention:** Always use a validation library like Zod (`z.object(...).safeParse(data)`) before passing the parsed and validated `result.data` to database commands.
