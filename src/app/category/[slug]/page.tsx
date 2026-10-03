"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Filter, Flame, Clock, RefreshCw } from "lucide-react";
import { CATEGORIES, MOCK_ARTICLES } from "@/data/mockNewsData";
import { useApp } from "@/context/AppContext";
import NewsCard from "@/components/common/NewsCard";
import { CategorySlug } from "@/types/news";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const { language } = useApp();
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const categoryItem = CATEGORIES.find((c) => c.slug === slug);

  if (!categoryItem || slug === "all") {
    // If invalid category slug
    notFound();
  }

  const categoryName = language === "bn" ? categoryItem.nameBn : categoryItem.nameEn;

  // Filter articles for this category
  let categoryArticles = MOCK_ARTICLES.filter((a) => a.category === slug);
  if (categoryArticles.length === 0) {
    categoryArticles = MOCK_ARTICLES.slice(0, 5); // fallback mock to keep preview rich
  }

  // Sort articles
  if (sortBy === "popular") {
    categoryArticles.sort((a, b) => b.viewsCount - a.viewsCount);
  } else {
    categoryArticles.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  const leadArticle = categoryArticles[0];
  const otherArticles = categoryArticles.slice(1, visibleCount);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setIsLoadingMore(false);
    }, 600);
  };

  return (
    <div className="w-full py-8 sm:py-12 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-red-600 transition-colors">
            {language === "bn" ? "প্রচ্ছদ" : "Home"}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-red-600 dark:text-red-400 font-bold">
            {categoryName}
          </span>
        </nav>

        {/* Category Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b-2 border-red-600">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-8 bg-red-600 rounded-sm" />
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">
                {categoryName}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 pl-6">
              {language === "bn"
                ? `${categoryName} বিভাগের দেশ ও বিদেশের সর্বশেষ তাজা সংবাদ ও বিশ্লেষণ`
                : `Latest breaking updates, reports, and perspectives in ${categoryName}`}
            </p>
          </div>

          {/* Sort Tabs */}
          <div className="flex items-center gap-2 self-start sm:self-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setSortBy("latest")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                sortBy === "latest"
                  ? "bg-white dark:bg-slate-900 text-red-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{language === "bn" ? "সর্বশেষ" : "Latest"}</span>
            </button>
            <button
              onClick={() => setSortBy("popular")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                sortBy === "popular"
                  ? "bg-white dark:bg-slate-900 text-red-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>{language === "bn" ? "জনপ্রিয়" : "Most Read"}</span>
            </button>
          </div>
        </div>

        {/* Lead Category Story */}
        {leadArticle && (
          <div className="mb-10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-3">
              {language === "bn" ? "বিশেষ ফিচার স্টোরি" : "Featured Lead Story"}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="lg:col-span-7">
                <Link
                  href={`/news/${leadArticle.slug}`}
                  className="block relative aspect-[16/10] rounded-2xl overflow-hidden group shadow-md"
                >
                  <img
                    src={leadArticle.imageUrl}
                    alt={language === "bn" ? leadArticle.titleBn : leadArticle.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold bg-red-600 text-white shadow-sm uppercase">
                    {categoryName}
                  </span>
                </Link>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>
                      {language === "bn"
                        ? leadArticle.publishedTimeBn
                        : leadArticle.publishedTimeEn}
                    </span>
                    <span>•</span>
                    <span>
                      {language === "bn"
                        ? leadArticle.readTimeBn
                        : leadArticle.readTimeEn}
                    </span>
                  </div>

                  <Link href={`/news/${leadArticle.slug}`}>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white hover:text-red-600 transition-colors leading-snug">
                      {language === "bn" ? leadArticle.titleBn : leadArticle.titleEn}
                    </h2>
                  </Link>

                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                    {language === "bn" ? leadArticle.summaryBn : leadArticle.summaryEn}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={leadArticle.author.avatar}
                      alt={leadArticle.author.nameBn}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {language === "bn"
                        ? leadArticle.author.nameBn
                        : leadArticle.author.nameEn}
                    </span>
                  </div>
                  <Link
                    href={`/news/${leadArticle.slug}`}
                    className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline"
                  >
                    {language === "bn" ? "সম্পূর্ণ পড়ুন ›" : "Read Full Story ›"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherArticles.map((art) => (
            <NewsCard key={art.id} article={art} variant="standard" />
          ))}
        </div>

        {/* Load More Button Simulation */}
        <div className="mt-12 text-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm transition-all border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer"
          >
            <RefreshCw
              className={`w-4 h-4 text-red-600 ${isLoadingMore ? "animate-spin" : ""}`}
            />
            <span>
              {isLoadingMore
                ? language === "bn"
                  ? "লোড হচ্ছে..."
                  : "Loading Stories..."
                : language === "bn"
                ? "আরও সংবাদ দেখুন"
                : "Load More News"}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}
