'use client';

import type React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "@/hooks/useTheme";

type LayoutProps = { children: React.ReactNode };

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { isDark, toggleTheme, mounted } = useTheme();
  const isActive = (path: string) => router.pathname === path;
  const year = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#1a1a1a] transition-colors">
      {/* Header */}
      <header className="border-b-4 border-black dark:border-[#666]">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold dark:text-[#f5f5f5]">
              ⚡ PlusWars
            </Link>
            <div className="flex gap-6 items-center">
              <Link
                href="/"
                className={`font-bold dark:text-[#f5f5f5] ${isActive("/") ? "underline" : ""} hover:underline`}
              >
                Home
              </Link>
              <Link
                href="/constructions"
                className={`font-bold dark:text-[#f5f5f5] ${isActive("/constructions") || isActive("/constructions/[slug]") ? "underline" : ""} hover:underline`}
              >
                Constructions
              </Link>
              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="ml-4 px-3 py-1 border-2 border-black dark:border-[#666] rounded font-bold transition-colors dark:text-[#f5f5f5] dark:bg-[#333] hover:bg-gray-100 dark:hover:bg-[#444]"
                  aria-label="Toggle dark mode"
                >
                  {isDark ? '☀️' : '🌙'}
                </button>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-black dark:border-[#666] mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-gray-600 dark:text-gray-400">
          <p>© {year} PlusWars. Not affiliated with Plus-Plus®.</p>
        </div>
      </footer>
    </div>
  );
}
