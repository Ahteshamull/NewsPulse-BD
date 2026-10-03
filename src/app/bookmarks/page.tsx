"use client";

import React from "react";
import Link from "next/link";
import { Bookmark, Trash2, ArrowLeft, BookOpen } from "lucide-react";
import { MOCK_ARTICLES } from "@/data/mockNewsData";
import { useApp } from "@/context/AppContext";
import NewsCard from "@/components/common/NewsCard";

export default function BookmarksPage() {
  const { language, bookmarks, toggleBookmark } = useApp();

  const savedArticles = MOCK_ARTICLES.filter((a) => bookmarks.includes(a.slug));

  const handleClearAll = () => {
    if (confirm(language === "bn" ? "আপনি কি সংরক্ষিত সব সংবাদ মুছে ফেলতে চান?" : "Are you sure you want to clear all bookmarks?")) {
      bookmarks.forEach((slug) => toggleBookmark(slug));
    }
  };

  return (
    <div className="w-full py-10 sm:py-14 bg-white dark:bg-slate-900 transition-colors min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b-2 border-red-600">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-8 bg-red-600 rounded-sm" />
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
                <Bookmark className="w-7 h-7 text-red-600 fill-red-600" />
                {language === "bn" ? "সংরক্ষিত সংবাদসমূহ" : "Saved Bookmarks"}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 pl-6">
              {language === "bn"
                ? "আপনার সুবিধাজনক সময়ে পড়ার জন্য সেভ করে রাখা সংবাদ তালিকা"
                : "Articles you saved for later reading on this device"}
            </p>
          </div>

          {savedArticles.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 transition-colors border border-rose-200 dark:border-rose-900/60"
            >
              <Trash2 className="w-4 h-4" />
              <span>{language === "bn" ? "সব মুছুন" : "Clear All"}</span>
            </button>
          )}
        </div>

        {/* Bookmarks Grid */}
        {savedArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedArticles.map((article) => (
              <NewsCard key={article.id} article={article} variant="standard" />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-400">
              <BookOpen className="w-8 h-8 stroke-1" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              {language === "bn"
                ? "এখনও কোনো সংবাদ সংরক্ষণ করেননি"
                : "No saved articles yet"}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 mb-6 leading-relaxed">
              {language === "bn"
                ? "যেকোনো সংবাদের বুকমার্ক আইকনে ক্লিক করে পরবর্তীতে পড়ার জন্য এখানে সংরক্ষণ করতে পারেন।"
                : "Click the bookmark icon on any news story to store it here for offline reading."}
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors shadow-md shadow-red-600/30"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === "bn" ? "প্রচ্ছদে ফিরে যান" : "Browse News"}</span>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
