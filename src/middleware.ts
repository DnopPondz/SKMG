import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // ป้องกันทุกหน้าภายใต้ /dashboard
  matcher: ["/dashboard/:path*"],
};