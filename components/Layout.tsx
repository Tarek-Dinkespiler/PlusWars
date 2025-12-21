'use client';

import type React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "next-i18next";

type LayoutProps = { children: React.ReactNode };

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { isDark, toggleTheme, mounted } = useTheme();
  const { t, i18n } = useTranslation('common');
  const isActive = (path: string) => router.pathname === path;
  const year = new Date().getFullYear();

  const changeLanguage = (lang: string) => {
    router.push(router.asPath, router.asPath, { locale: lang });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#1a1a1a] transition-colors">
      {/* Header */}
      <header className="border-b-4 border-black dark:border-[#666]">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold dark:text-[#f5f5f5]">
              ⚡ PlusWars
            </Link>
            <div className="flex gap-4 items-center">
              <Link
                href="/"
                className={`font-bold dark:text-[#f5f5f5] ${isActive("/") ? "underline" : ""} hover:underline`}
              >
                {t('home')}
              </Link>
              <Link
                href="/constructions"
                className={`font-bold dark:text-[#f5f5f5] ${isActive("/constructions") || isActive("/constructions/[slug]") ? "underline" : ""} hover:underline`}
              >
                {t('constructions')}
              </Link>

              {/* Language Switcher */}
              <div className="flex gap-2 items-center border-l-2 border-black dark:border-[#666] pl-4">
                <button
                  onClick={() => changeLanguage('en')}
                  className={`px-2 py-1 text-lg transition-colors ${
                    i18n.language === 'en'
                      ? 'bg-black dark:bg-[#333] rounded'
                      : 'hover:opacity-70'
                  }`}
                  aria-label="Switch to English"
                >
                  🇬🇧
                </button>
                <button
                  onClick={() => changeLanguage('fr')}
                  className={`px-2 py-1 text-lg transition-colors ${
                    i18n.language === 'fr'
                      ? 'bg-black dark:bg-[#333] rounded'
                      : 'hover:opacity-70'
                  }`}
                  aria-label="Switch to French"
                >
                  🇫🇷
                </button>
              </div>

              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="px-3 py-1 border-2 border-black dark:border-[#666] rounded font-bold transition-colors dark:text-[#f5f5f5] dark:bg-[#333] hover:bg-gray-100 dark:hover:bg-[#444]"
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
          <p>{t('copyright', { year })}</p>
        </div>
      </footer>
    </div>
  );
}
