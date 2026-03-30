import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
// แก้ไขการสะกดคำจาก SeessionProvider เป็น SessionProvider ให้ตรงกับมาตรฐาน
import AuthSessionProvider from "../components/SeessionProvider"; 

export const metadata: Metadata = {
  title: "My App",
  description: "Auth with Next.js, MongoDB, roles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* หุ้ม AuthSessionProvider ไว้ที่ระดับบนสุดเพื่อให้ Sidebar และ Navbar เข้าถึง Session ได้ */}
        <AuthSessionProvider>
          <div className="flex">
            <Sidebar />
            <div className="flex-1 bg-gray-100 min-h-screen">
              <Navbar />
              <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
            </div>
          </div>
        </AuthSessionProvider>
      </body>
    </html>
  );
}