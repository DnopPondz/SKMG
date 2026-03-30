import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // ตรวจสอบสิทธิ์ทุกหน้าที่ขึ้นต้นด้วย /dashboard
  matcher: ["/dashboard/:path*"],
};