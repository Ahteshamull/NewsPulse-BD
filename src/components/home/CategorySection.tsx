"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { NewsArticle, CategorySlug } from "@/types/news";
import { useApp } from "@/context/AppContext";
import NewsCard from "@/components/common/NewsCard";

interface CategorySectionProps {
  titleBn: string;
  titleEn: string;
  slug: CategorySlug;
  articles: NewsArticle[];
  accentColor?: string;
}

export default function CategorySection({
  titleBn,
  titleEn,
  slug,
  articles,
}: CategorySectionProps) {
  const { language } = useApp();

  if (!articles || articles.length === 0) return null;

  const title = language === "bn" ? titleBn : titleEn;
  const leadArticle = articles[0];
  const sideArticles = articles.slice(1, 4);

  return (
    <section className="w-full py-8 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Header */}
        <div className="flex items-center justify-between pb-3 mb-6 border-b-2 border-red-600">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-6 bg-red-600 rounded-sm" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              {title}
            </h2>
          </div>

          <Link
            href={`/category/${slug}`}
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors group"
          >
            <span>{language === "bn" ? "আরও খবর" : "See All"}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Category Card (7 cols) */}
          <div className="lg:col-span-7">
            {leadArticle && <NewsCard article={leadArticle} variant="standard" />}
          </div>

          {/* Side Articles (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {sideArticles.map((art) => (
              <NewsCard key={art.id} article={art} variant="horizontal" showExcerpt={false} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
