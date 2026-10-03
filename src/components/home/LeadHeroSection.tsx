"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, Play, Volume2, Bookmark, Flame, Radio, ArrowRight } from "lucide-react";
import { NewsArticle } from "@/types/news";
import { useApp } from "@/context/AppContext";

interface LeadHeroSectionProps {
  leadArticle: NewsArticle;
  secondaryArticles: NewsArticle[];
  latestArticles: NewsArticle[];
}

export default function LeadHeroSection({
  leadArticle,
  secondaryArticles,
  latestArticles,
}: LeadHeroSectionProps) {
  const { language, toggleBookmark, isBookmarked } = useApp();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const isLeadBookmarked = isBookmarked(leadArticle.slug);

  const leadTitle = language === "bn" ? leadArticle.titleBn : leadArticle.titleEn;
  const leadSubtitle = language === "bn" ? leadArticle.subtitleBn : leadArticle.subtitleEn;
  const leadSummary = language === "bn" ? leadArticle.summaryBn : leadArticle.summaryEn;
  const leadCategory = language === "bn" ? leadArticle.categoryNameBn : leadArticle.categoryNameEn;
  const leadTime = language === "bn" ? leadArticle.publishedTimeBn : leadArticle.publishedTimeEn;
  const leadReadTime = language === "bn" ? leadArticle.readTimeBn : leadArticle.readTimeEn;

  return (
    <section className="w-full py-6 sm:py-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Main Big Lead Column (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="group relative">
              {/* Lead Image Frame */}
              <Link
                href={`/news/${leadArticle.slug}`}
                className="relative block aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-lg bg-slate-100 dark:bg-slate-800"
              >
                <img
                  src={leadArticle.imageUrl}
                  alt={leadTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Top Overlay Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-red-600 text-white tracking-widest uppercase shadow-md flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    {language === "bn" ? "শীর্ষ সংবাদ" : "Top Story"}
                  </span>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleBookmark(leadArticle.slug);
                    }}
                    className={`p-2 rounded-full bg-black/60 backdrop-blur-md hover:bg-black/80 transition-colors ${
                      isLeadBookmarked ? "text-red-500" : "text-white"
                    }`}
                    title={isLeadBookmarked ? "সংরক্ষণ বাতিল" : "সংরক্ষণ করুন"}
                  >
                    <Bookmark className={`w-4 h-4 ${isLeadBookmarked ? "fill-red-500" : ""}`} />
                  </button>
                </div>

                {/* Bottom Overlay Info on Mobile/Tablet */}
                <div className="absolute bottom-4 left-4 right-4 sm:hidden">
                  <span className="text-xs text-red-400 font-bold uppercase tracking-wider mb-1 block">
                    {leadCategory}
                  </span>
                  <h2 className="text-lg font-bold text-white leading-snug">
                    {leadTitle}
                  </h2>
                </div>
              </Link>
            </div>

            {/* Desktop Headline & Lead Article Body */}
            <div className="mt-5">
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-2">
                <span className="px-2.5 py-0.5 rounded-full font-bold bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 uppercase tracking-wide">
                  {leadCategory}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {leadTime}
                </span>
                <span>•</span>
                <span>{leadReadTime}</span>
              </div>

              <Link href={`/news/${leadArticle.slug}`}>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors leading-[1.2] tracking-tight">
                  {leadTitle}
                </h1>
              </Link>

              {leadSubtitle && (
                <p className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                  {leadSubtitle}
                </p>
              )}

              <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed line-clamp-3">
                {leadSummary}
              </p>

              {/* Audio Listen Simulation & Author Row */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={leadArticle.author.avatar}
                    alt={leadArticle.author.nameBn}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                      {language === "bn" ? leadArticle.author.nameBn : leadArticle.author.nameEn}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {language === "bn" ? leadArticle.author.roleBn : leadArticle.author.roleEn}
                    </p>
                  </div>
                </div>

                {/* Audio Listen Simulation Button */}
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isPlayingAudio
                      ? "bg-red-600 text-white animate-pulse"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  <Volume2 className="w-4 h-4 text-red-500" />
                  <span>
                    {isPlayingAudio
                      ? language === "bn"
                        ? "অডিও প্লে হচ্ছে..."
                        : "Playing Audio..."
                      : language === "bn"
                      ? "সংবাদটি শুনুন (২ মিনিট)"
                      : "Listen to Story (2m)"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Secondary Top Stories + 24/7 Live Timeline (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Secondary Highlight Stories */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b-2 border-red-600">
                <h3 className="text-base font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-red-600" />
                  {language === "bn" ? "গুরুত্বপূর্ণ সংবাদ" : "Key Highlights"}
                </h3>
              </div>

              <div className="space-y-4">
                {secondaryArticles.map((article) => {
                  const title = language === "bn" ? article.titleBn : article.titleEn;
                  const cat = language === "bn" ? article.categoryNameBn : article.categoryNameEn;
                  const time = language === "bn" ? article.publishedTimeBn : article.publishedTimeEn;

                  return (
                    <Link
                      key={article.id}
                      href={`/news/${article.slug}`}
                      className="group flex gap-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 transition-all duration-200 shadow-2xs"
                    >
                      <div className="relative w-28 sm:w-32 h-20 sm:h-22 rounded-xl overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-700">
                        <img
                          src={article.imageUrl}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-[10px] text-red-600 dark:text-red-400 font-bold mb-1">
                            <span>{cat}</span>
                            <span className="text-slate-300 dark:text-slate-600">•</span>
                            <span className="text-slate-400 font-normal">{time}</span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                            {title}
                          </h4>
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {language === "bn" ? article.readTimeBn : article.readTimeEn}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* 24/7 Live Timeline Update */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    {language === "bn" ? "২৪/৭ লাইভ আপডেট" : "24/7 Live Updates"}
                  </h4>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                  LIVE
                </span>
              </div>

              <div className="space-y-3 relative pl-4 border-l-2 border-slate-200 dark:border-slate-700">
                {latestArticles.slice(0, 4).map((art, idx) => {
                  const title = language === "bn" ? art.titleBn : art.titleEn;
                  const time = language === "bn" ? art.publishedTimeBn : art.publishedTimeEn;
                  return (
                    <Link
                      key={art.id}
                      href={`/news/${art.slug}`}
                      className="group block relative"
                    >
                      {/* Timeline Dot */}
                      <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-red-600 transition-colors" />
                      <span className="text-[10px] text-slate-400 font-medium block">
                        {time}
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-1">
                        {title}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
