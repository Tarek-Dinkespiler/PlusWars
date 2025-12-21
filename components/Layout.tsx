import type React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type LayoutProps = { children: React.ReactNode };

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const isActive = (path: string) => router.pathname === path;
  const year = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="border-b-4 border-black">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              ⚡ PlusWars
            </Link>
            <div className="flex gap-6 items-center">
              <Link
                href="/"
                className={`font-bold ${isActive("/") ? "underline" : ""} hover:underline`}
              >
                Home
              </Link>
              <Link
                href="/constructions"
                className={`font-bold ${isActive("/constructions") || isActive("/constructions/[slug]") ? "underline" : ""} hover:underline`}
              >
                Constructions
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-black mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-gray-600">
          <p>© {year} PlusWars. Not affiliated with Plus-Plus®.</p>
        </div>
      </footer>
    </div>
  );
}
