import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // ตรวจสอบสิทธิ์การเข้าถึงหน้า Dashboard
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect ไปหน้า login
      }
      return true;
    },
    // นำค่า Role จาก Token ใส่เข้าไปใน Session เพื่อให้ Client-side ใช้งานได้
    async session({ session, token }) {
      if (token.role && session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
    // เก็บ Role ไว้ใน Token เมื่อ Login สำเร็จ
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
  },
  providers: [], // กำหนดใน auth.ts
} satisfies NextAuthConfig;