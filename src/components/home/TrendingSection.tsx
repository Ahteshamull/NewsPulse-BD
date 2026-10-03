"use client";

import React from "react";
import Link from "next/link";
import { Flame, Eye, TrendingUp } from "lucide-react";
import { NewsArticle } from "@/types/news";
import { useApp } from "@/context/AppContext";
import { formatViews } from "@/lib/utils";

interface TrendingSectionProps {
  articles: NewsArticle[];
}

export default function TrendingSection({ articles }: TrendingSectionProps) {
  const { language } = useApp();

  const sortedTrending = [...articles]
    .filter((a) => a.isTrending)
    .sort((a, b) => (a.trendingRank || 99) - (b.trendingRank || 99))
    .slice(0, 5);

  return (
    <section className="w-full py-8 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-600/30">
              <Flame className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                {language === "bn" ? "সর্বাধিক পঠিত সংবাদ" : "Trending Headlines"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === "bn"
                  ? "গত ২৪ ঘণ্টায় পাঠকদের সবচেয়ে বেশি আগ্রহের সংবাদসমূহ"
                  : "Most read and engaged news stories in the last 24 hours"}
              </p>
            </div>
          </div>
          <span className="hidden sm:flex items-center gap-1 text-xs font-semibold text-red-600 dark:text-red-400">
            <TrendingUp className="w-4 h-4" />
            {language === "bn" ? "টপ ট্রেন্ডিং" : "Top Ranked"}
          </span>
        </div>

        {/* 5-Column Ranked Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {sortedTrending.map((article, idx) => {
            const rank = idx + 1;
            const rankFormatted = rank < 10 ? `0${rank}` : `${rank}`;
            const title = language === "bn" ? article.titleBn : article.titleEn;
            const category = language === "bn" ? article.categoryNameBn : article.categoryNameEn;

            return (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="group relative p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-300 dark:hover:border-red-900/60 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Big Stylized Rank Number */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl font-black tracking-tighter text-slate-300 dark:text-slate-700 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                      {rankFormatted}
                    </span>
                    <span className="text-[11px] font-bold uppercase text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 px-2 py-0.5 rounded">
                      {category}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-3 leading-snug">
                    {title}
                  </h3>
                </div>

                {/* View Counter */}
                <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>{formatViews(article.viewsCount, language)}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
