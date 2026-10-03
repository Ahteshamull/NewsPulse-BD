"use client";

import React from "react";
import Link from "next/link";
import { Clock, Bookmark, Eye } from "lucide-react";
import { NewsArticle } from "@/types/news";
import { useApp } from "@/context/AppContext";

interface NewsCardProps {
  article: NewsArticle;
  variant?: "standard" | "horizontal" | "compact" | "minimal";
  showExcerpt?: boolean;
}

export default function NewsCard({
  article,
  variant = "standard",
  showExcerpt = true,
}: NewsCardProps) {
  const { language, toggleBookmark, isBookmarked } = useApp();
  const bookmarked = isBookmarked(article.slug);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(article.slug);
  };

  const title = language === "bn" ? article.titleBn : article.titleEn;
  const categoryName = language === "bn" ? article.categoryNameBn : article.categoryNameEn;
  const publishedTime = language === "bn" ? article.publishedTimeBn : article.publishedTimeEn;
  const readTime = language === "bn" ? article.readTimeBn : article.readTimeEn;
  const summary = language === "bn" ? article.summaryBn : article.summaryEn;

  // Horizontal Variant
  if (variant === "horizontal") {
    return (
      <Link
        href={`/news/${article.slug}`}
        className="group flex gap-3.5 sm:gap-4 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-red-300 dark:hover:border-red-900/60 shadow-xs hover:shadow-md transition-all duration-300"
      >
        <div className="relative w-28 sm:w-36 md:w-44 h-24 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
          <img
            src={article.imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-xs text-white uppercase">
            {categoryName}
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                <Clock className="w-3 h-3" />
                {publishedTime}
              </span>
              <button
                onClick={handleBookmarkClick}
                className={`p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                  bookmarked ? "text-red-600" : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
                title={bookmarked ? "সংরক্ষণ বাতিল" : "সংরক্ষণ করুন"}
              >
                <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-red-600" : ""}`} />
              </button>
            </div>

            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
              {title}
            </h3>
          </div>

          {showExcerpt && (
            <p className="hidden sm:line-clamp-1 text-xs text-slate-500 dark:text-slate-400 mt-1">
              {summary}
            </p>
          )}

          <div className="text-[11px] text-slate-400 mt-1">
            <span>{readTime}</span>
          </div>
        </div>
      </Link>
    );
  }

  // Compact Variant (e.g. For Sidebars or Grids)
  if (variant === "compact") {
    return (
      <Link
        href={`/news/${article.slug}`}
        className="group flex gap-3 items-start py-2.5 border-b border-slate-100 dark:border-slate-800/80 last:border-b-0"
      >
        <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
          <img
            src={article.imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] text-red-600 dark:text-red-400 font-semibold mb-0.5">
            <span>{categoryName}</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-slate-400 font-normal">{publishedTime}</span>
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
            {title}
          </h4>
        </div>
      </Link>
    );
  }

  // Standard Editorial Card
  return (
    <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-xl hover:border-red-200 dark:hover:border-red-950 transition-all duration-300">
      <Link href={`/news/${article.slug}`} className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={article.imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Category Pill */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs text-red-600 dark:text-red-400 shadow-sm uppercase tracking-wider">
          {categoryName}
        </span>

        {/* Read Time Overlay */}
        <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[11px] font-medium bg-black/70 text-white backdrop-blur-xs">
          {readTime}
        </span>
      </Link>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Row */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {publishedTime}
            </span>
            <button
              onClick={handleBookmarkClick}
              className={`p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                bookmarked ? "text-red-600" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              }`}
              title={bookmarked ? "সংরক্ষণ বাতিল" : "সংরক্ষণ করুন"}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-red-600" : ""}`} />
            </button>
          </div>

          {/* Title */}
          <Link href={`/news/${article.slug}`}>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
              {title}
            </h3>
          </Link>

          {/* Excerpt */}
          {showExcerpt && (
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
              {summary}
            </p>
          )}
        </div>

        {/* Author / Read More Row */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs">
          <div className="flex items-center gap-2">
            <img
              src={article.author.avatar}
              alt={article.author.nameBn}
              className="w-5 h-5 rounded-full object-cover"
            />
            <span className="font-medium text-slate-600 dark:text-slate-300">
              {language === "bn" ? article.author.nameBn : article.author.nameEn}
            </span>
          </div>
          <Link
            href={`/news/${article.slug}`}
            className="text-red-600 dark:text-red-400 font-bold hover:underline"
          >
            {language === "bn" ? "বিস্তারিত ›" : "Read More ›"}
          </Link>
        </div>
      </div>
    </div>
  );
}
