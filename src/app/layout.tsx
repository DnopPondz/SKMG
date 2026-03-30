import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
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
        <AuthSessionProvider>
          <Navbar />
          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        </AuthSessionProvider>
      </body>
    </html>
  );
}