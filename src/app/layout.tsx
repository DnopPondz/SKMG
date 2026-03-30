import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
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
        <div className="flex">
          <Sidebar />
          <div className="flex-1 bg-gray-100 min-h-screen">
            <AuthSessionProvider>
              <Navbar />
              <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
            </AuthSessionProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
