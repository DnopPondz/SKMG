## 2024-05-24 - Mass Assignment Vulnerability in API Routes
**Vulnerability:** API routes (e.g., product addition) directly passed `await req.json()` data into Mongoose `Model.create()` calls without validation.
**Learning:** This is a mass assignment vulnerability that could allow users to override system-managed fields (like `_id` or `createdAt`) or inject unexpected data.
**Prevention:** Always define a Zod schema matching the expected fields and use `schema.safeParse(data)`. Pass the validated `result.data` to Mongoose instead of the raw input. Additionally, ensure `catch` blocks in API routes return generic 500 error messages instead of leaking `error.message` to prevent internal information disclosure.
