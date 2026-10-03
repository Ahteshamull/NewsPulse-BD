"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { MOCK_ARTICLES, CATEGORIES } from "@/data/mockNewsData";
import { CategorySlug } from "@/types/news";

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, language } = useApp();
  const [query, setQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState<CategorySlug | "all">("all");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  // Filter articles
  const filteredArticles = useMemo(() => {
    return MOCK_ARTICLES.filter((article) => {
      const matchesCat =
        selectedCat === "all" || article.category === selectedCat;

      const q = query.trim().toLowerCase();
      if (!q) return matchesCat;

      const titleMatch =
        article.titleBn.toLowerCase().includes(q) ||
        article.titleEn.toLowerCase().includes(q);
      const summaryMatch =
        article.summaryBn.toLowerCase().includes(q) ||
        article.summaryEn.toLowerCase().includes(q);
      const tagMatch =
        article.tagsBn.some((t) => t.toLowerCase().includes(q)) ||
        article.tagsEn.some((t) => t.toLowerCase().includes(q));

      return matchesCat && (titleMatch || summaryMatch || tagMatch);
    });
  }, [query, selectedCat]);

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40">
            <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                language === "bn"
                  ? "খবরের শিরোনাম, বিষয় বা কীওয়ার্ড দিয়ে খুঁজুন..."
                  : "Search news headlines, topics, or keywords..."
              }
              className="w-full bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 text-base outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1"
              >
                {language === "bn" ? "মুছুন" : "Clear"}
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 px-4 py-2.5 overflow-x-auto border-b border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const active = selectedCat === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCat(cat.slug as CategorySlug | "all")}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    active
                      ? "bg-red-600 text-white shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {language === "bn" ? cat.nameBn : cat.nameEn}
                </button>
              );
            })}
          </div>

          {/* Search Results List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="group flex gap-3.5 p-3 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/60 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                >
                  <div className="relative w-24 h-18 sm:w-28 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-800">
                    <img
                      src={article.imageUrl}
                      alt={article.titleBn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide">
                        {language === "bn"
                          ? article.categoryNameBn
                          : article.categoryNameEn}
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {language === "bn"
                          ? article.publishedTimeBn
                          : article.publishedTimeEn}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 line-clamp-2 leading-snug transition-colors">
                      {language === "bn" ? article.titleBn : article.titleEn}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-1">
                      {language === "bn" ? article.summaryBn : article.summaryEn}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="py-12 text-center text-slate-400">
                <BookOpen className="w-10 h-10 mx-auto mb-2 stroke-1 opacity-50" />
                <p className="text-sm font-medium">
                  {language === "bn"
                    ? "কোনো সংবাদ পাওয়া যায়নি"
                    : "No news articles found"}
                </p>
                <p className="text-xs mt-1 text-slate-400">
                  {language === "bn"
                    ? "ভিন্ন কোনো শব্দ বা ক্যাটাগরি দিয়ে চেষ্টা করুন"
                    : "Try searching with different keywords or categories"}
                </p>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/70 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>
              {language === "bn"
                ? `মোট ${filteredArticles.length} টি ফলাফল`
                : `${filteredArticles.length} results found`}
            </span>
            <span className="hidden sm:inline">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px]">
                Esc
              </kbd>{" "}
              {language === "bn" ? "বন্ধ করতে" : "to close"}
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
