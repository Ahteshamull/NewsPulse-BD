"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, BookOpen, Clock, ArrowRight } from "lucide-react";
import { CATEGORIES, MOCK_ARTICLES } from "@/data/mockNewsData";
import { useApp } from "@/context/AppContext";
import NewsCard from "@/components/common/NewsCard";
import { CategorySlug } from "@/types/news";

export default function SearchPage() {
  const { language } = useApp();
  const [query, setQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState<CategorySlug | "all">("all");

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

  return (
    <div className="w-full py-10 sm:py-14 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            {language === "bn" ? "সংবাদ অনুসন্ধান" : "Search News Archive"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            {language === "bn"
              ? "শিরোনাম, বিষয়বস্তু বা ট্যাগ দিয়ে আপনার কাঙ্ক্ষিত সংবাদটি সহজে খুঁজুন"
              : "Locate articles, investigative dispatches, and reports across all categories"}
          </p>
        </div>

        {/* Big Search Input Field */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative flex items-center shadow-lg rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800 border-2 border-red-600/30 focus-within:border-red-600 transition-all">
            <Search className="w-5 h-5 text-red-600 ml-4 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                language === "bn"
                  ? "যে কোনো সংবাদ খুঁজুন (যেমন: বাজেট, ক্রিকেট, মেট্রোরেল)..."
                  : "Search news (e.g. economy, cricket, technology)..."
              }
              className="w-full px-4 py-3.5 bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="px-4 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {language === "bn" ? "মুছুন" : "Clear"}
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 mt-4 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
            {CATEGORIES.map((cat) => {
              const active = selectedCat === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCat(cat.slug as CategorySlug | "all")}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    active
                      ? "bg-red-600 text-white shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                  }`}
                >
                  {language === "bn" ? cat.nameBn : cat.nameEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Result Header */}
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <span>
            {language === "bn"
              ? `মোট ${filteredArticles.length} টি সংবাদ পাওয়া গেছে`
              : `Found ${filteredArticles.length} matching articles`}
          </span>
          {query && (
            <span>
              {language === "bn" ? "অনুসন্ধান:" : "Query:"} &ldquo;{query}&rdquo;
            </span>
          )}
        </div>

        {/* Results Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <NewsCard key={article.id} article={article} variant="standard" />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center max-w-md mx-auto">
            <BookOpen className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-3 stroke-1" />
            <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
              {language === "bn"
                ? "কোনো মিল খুঁজে পাওয়া যায়নি"
                : "No matching results found"}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {language === "bn"
                ? "ভিন্ন শব্দ দিয়ে খুঁজুন অথবা অন্য কোনো ক্যাটাগরি ফিল্টার করে দেখুন।"
                : "Try adjusting your search terms or selecting another category filter."}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
