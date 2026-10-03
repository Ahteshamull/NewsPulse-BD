"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Video, Flame, BookMarked, Sparkles } from "lucide-react";
import { CATEGORIES } from "@/data/mockNewsData";
import { useApp } from "@/context/AppContext";

interface NavbarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export default function Navbar({ isMobileMenuOpen, setIsMobileMenuOpen }: NavbarProps) {
  const pathname = usePathname();
  const { language } = useApp();

  const isCurrentActive = (slug: string) => {
    if (slug === "all") return pathname === "/";
    return pathname === `/category/${slug}`;
  };

  return (
    <>
      {/* Desktop Sticky Navigation Bar */}
      <nav className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Category Links Carousel/Scroll */}
            <div className="flex items-center gap-1 overflow-x-auto py-2.5 scrollbar-none w-full">
              {CATEGORIES.map((cat) => {
                const active = isCurrentActive(cat.slug);
                const href = cat.slug === "all" ? "/" : `/category/${cat.slug}`;
                return (
                  <Link
                    key={cat.slug}
                    href={href}
                    className={`relative px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-150 whitespace-nowrap ${
                      active
                        ? "text-white bg-red-600 shadow-sm shadow-red-500/20"
                        : "text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                    }`}
                  >
                    {language === "bn" ? cat.nameBn : cat.nameEn}
                    {active && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-red-600 rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}

              {/* Extra Videos Link with Play Icon */}
              <Link
                href="/videos"
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  pathname === "/videos"
                    ? "text-white bg-red-600 shadow-sm"
                    : "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40"
                }`}
              >
                <Video className="w-4 h-4 fill-current" />
                <span>{language === "bn" ? "ভিডিও" : "Videos"}</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation (Framer Motion) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden"
            />

            {/* Slide-in Menu Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 bottom-0 left-0 z-50 w-[82%] max-w-sm bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-5 overflow-y-auto flex flex-col justify-between shadow-2xl lg:hidden"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-bold text-slate-900 dark:text-white">
                      News<span className="text-red-600">Pulse</span>
                    </span>
                    <span className="text-[10px] font-black bg-red-600 text-white px-1 py-0.5 rounded">
                      BD
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Categories List */}
                <div className="mt-5 space-y-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
                    {language === "bn" ? "সকল বিভাগ" : "All Categories"}
                  </p>
                  {CATEGORIES.map((cat) => {
                    const active = isCurrentActive(cat.slug);
                    const href = cat.slug === "all" ? "/" : `/category/${cat.slug}`;
                    return (
                      <Link
                        key={cat.slug}
                        href={href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          active
                            ? "bg-red-600 text-white font-bold"
                            : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        <span>{language === "bn" ? cat.nameBn : cat.nameEn}</span>
                        <ChevronRight className={`w-4 h-4 ${active ? "text-white" : "text-slate-400"}`} />
                      </Link>
                    );
                  })}

                  <Link
                    href="/videos"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      pathname === "/videos"
                        ? "bg-red-600 text-white font-bold"
                        : "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      <span>{language === "bn" ? "ভিডিও নিউজ হাব" : "Video News Hub"}</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/bookmarks"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <BookMarked className="w-4 h-4 text-red-600" />
                      <span>{language === "bn" ? "সংরক্ষিত সংবাদ" : "Saved Bookmarks"}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                </div>
              </div>

              {/* Drawer Footer Info */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6 text-xs text-slate-400">
                <p className="font-semibold text-slate-700 dark:text-slate-300">
                  NewsPulse BD Ltd.
                </p>
                <p className="mt-1">
                  {language === "bn"
                    ? "সর্বাধুনিক প্রযুক্তিতে নির্মিত ডিজিটাল সংবাদ মাধ্যম"
                    : "Next-Gen Bangladeshi Digital Newsroom"}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
