"use client";

import React from "react";
import Link from "next/link";
import { Search, Bookmark, Tv, Menu } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface HeaderProps {
  onToggleMobileMenu?: () => void;
}

export default function Header({ onToggleMobileMenu }: HeaderProps) {
  const { language, bookmarks, setIsSearchOpen } = useApp();

  return (
    <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-5 flex items-center justify-between gap-4">
        {/* Mobile Hamburger & Logo Container */}
        <div className="flex items-center gap-3">
          {onToggleMobileMenu && (
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}

          {/* Logo */}
          <Link href="/" className="group flex flex-col">
            <div className="flex items-center gap-1.5">
              <div className="relative flex items-center">
                <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  News<span className="text-red-600 dark:text-red-500">Pulse</span>
                </span>
                <span className="ml-1 px-1.5 py-0.5 rounded text-[11px] sm:text-xs font-black bg-red-600 text-white tracking-widest uppercase">
                  BD
                </span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse ml-0.5" />
            </div>
            <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide">
              {language === "bn"
                ? "সত্য ও বস্তুনিষ্ঠ সাংবাদিকতার অগ্রদূত"
                : "The Pulse of Truth & Modern Journalism"}
            </span>
          </Link>
        </div>

        {/* Right Action Icons: Live TV, Bookmarks, Search */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live TV Button */}
          <Link
            href="/videos"
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white dark:bg-red-950/40 dark:hover:bg-red-600 dark:text-red-400 dark:hover:text-white transition-all duration-200 font-semibold text-xs sm:text-sm border border-red-200 dark:border-red-900/60 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping shrink-0" />
            <Tv className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">
              {language === "bn" ? "লাইভ টিভি" : "Live TV"}
            </span>
          </Link>

          {/* Bookmarked News Link */}
          <Link
            href="/bookmarks"
            className="relative p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-red-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={language === "bn" ? "সংরক্ষিত সংবাদ" : "Saved News"}
          >
            <Bookmark className="w-5 h-5" />
            {bookmarks.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                {bookmarks.length}
              </span>
            )}
          </Link>

          {/* Quick Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-xs sm:text-sm"
            title="Search News (Ctrl+K)"
          >
            <Search className="w-4 h-4" />
            <span className="hidden md:inline font-medium">
              {language === "bn" ? "অনুসন্ধান..." : "Search..."}
            </span>
            <kbd className="hidden lg:inline text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>
    </header>
  );
}
