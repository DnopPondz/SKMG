import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // ตรวจสอบสิทธิ์เฉพาะหน้าที่มี path เริ่มต้นด้วย /dashboard
  matcher: ["/dashboard/:path*"],
};