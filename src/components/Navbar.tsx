import Link from "next/link";
import { auth, signOut } from "@/lib/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-bold">
            MyApp
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-gray-700 hover:text-black"
          >
            Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {session?.user ? (
            <>
              <div className="text-right text-sm">
                <p className="font-medium">{session.user.name}</p>
                <p className="text-gray-500">
                  {session.user.email} ({session.user.role})
                </p>
              </div>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/login" });
                }}
              >
                <button
                  type="submit"
                  className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded border px-4 py-2 hover:bg-gray-100"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}