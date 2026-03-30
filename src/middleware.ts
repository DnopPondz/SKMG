export { auth as middleware } from "@/lib/auth";

export const config = {
  // ปกป้องหน้า dashboard และหน้าลูกทั้งหมด
  matcher: ["/dashboard/:path*"],
};