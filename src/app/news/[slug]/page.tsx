"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  Bookmark,
  Share2,
  ChevronRight,
  Eye,
  Calendar,
  User,
  Quote,
  Flame,
  ArrowLeft,
} from "lucide-react";
import { MOCK_ARTICLES } from "@/data/mockNewsData";
import { useApp } from "@/context/AppContext";
import AudioReader from "@/components/news/AudioReader";
import FontSizeToggle from "@/components/news/FontSizeToggle";
import ShareButtons from "@/components/news/ShareButtons";
import ReactionWidget from "@/components/news/ReactionWidget";
import CommentsSection from "@/components/news/CommentsSection";
import NewsCard from "@/components/common/NewsCard";
import { formatViews } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function NewsDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const { language, fontSize, toggleBookmark, isBookmarked } = useApp();

  const article = MOCK_ARTICLES.find((a) => a.slug === slug) || MOCK_ARTICLES[0];

  if (!article) {
    notFound();
  }

  const bookmarked = isBookmarked(article.slug);

  const title = language === "bn" ? article.titleBn : article.titleEn;
  const subtitle = language === "bn" ? article.subtitleBn : article.subtitleEn;
  const categoryName = language === "bn" ? article.categoryNameBn : article.categoryNameEn;
  const publishedTime = language === "bn" ? article.publishedTimeBn : article.publishedTimeEn;
  const readTime = language === "bn" ? article.readTimeBn : article.readTimeEn;
  const content = language === "bn" ? article.contentBn : article.contentEn;
  const imageCaption = language === "bn" ? article.imageCaptionBn : article.imageCaptionEn;
  const tags = language === "bn" ? article.tagsBn : article.tagsEn;

  // Related news
  const relatedNews = MOCK_ARTICLES.filter(
    (a) => a.id !== article.id && (a.category === article.category || a.isTrending)
  ).slice(0, 4);

  // Dynamic font size class
  const contentFontSizeClass =
    fontSize === "sm"
      ? "text-sm sm:text-base leading-relaxed"
      : fontSize === "lg"
      ? "text-lg sm:text-xl leading-loose"
      : "text-base sm:text-lg leading-relaxed";

  return (
    <article className="w-full py-6 sm:py-10 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6 flex-wrap">
          <Link href="/" className="hover:text-red-600 transition-colors">
            {language === "bn" ? "প্রচ্ছদ" : "Home"}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link
            href={`/category/${article.category}`}
            className="text-red-600 dark:text-red-400 font-semibold hover:underline"
          >
            {categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-700 dark:text-slate-300 line-clamp-1 max-w-[280px] sm:max-w-md">
            {title}
          </span>
        </nav>

        {/* Main Article Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left / Article Main Content (8 cols) */}
          <div className="lg:col-span-8">
            
            {/* Category Badge & Live Pulse */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white uppercase tracking-wider">
                {categoryName}
              </span>
              {article.isLead && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400">
                  {language === "bn" ? "শীর্ষ সংবাদ" : "Top Story"}
                </span>
              )}
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-slate-900 dark:text-white leading-[1.25] tracking-tight mb-4">
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p className="text-base sm:text-xl font-medium text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {subtitle}
              </p>
            )}

            {/* Author Profile Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200 dark:border-slate-800 my-6">
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.nameBn}
                  className="w-12 h-12 rounded-full object-cover border-2 border-red-500/20"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {language === "bn" ? article.author.nameBn : article.author.nameEn}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {language === "bn" ? article.author.roleBn : article.author.roleEn}
                  </p>
                </div>
              </div>

              {/* Timestamp & Views */}
              <div className="flex flex-col sm:items-end text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  {publishedTime}
                </span>
                <span className="flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                  {readTime} • {formatViews(article.viewsCount, language)}
                </span>
              </div>
            </div>

            {/* Sticky Action Toolbar (Font Sizer, Share, Bookmark) */}
            <div className="flex items-center justify-between gap-3 py-2 px-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 mb-6 flex-wrap">
              <FontSizeToggle />
              <ShareButtons title={title} />
              <button
                onClick={() => toggleBookmark(article.slug)}
                className={`p-2 rounded-xl border transition-all ${
                  bookmarked
                    ? "bg-red-50 dark:bg-red-950/40 border-red-500 text-red-600"
                    : "bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:text-red-600"
                }`}
                title={bookmarked ? "সংরক্ষণ বাতিল" : "সংরক্ষণ করুন"}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-red-600" : ""}`} />
              </button>
            </div>

            {/* Featured Image */}
            <div className="mb-6 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-md">
              <img
                src={article.imageUrl}
                alt={title}
                className="w-full h-auto max-h-[500px] object-cover"
              />
              {imageCaption && (
                <p className="text-xs text-slate-500 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-950/50 italic border-t border-slate-100 dark:border-slate-800">
                  {imageCaption}
                </p>
              )}
            </div>

            {/* AI Audio Reader Simulation */}
            <AudioReader title={title} />

            {/* Article Content Paragraphs */}
            <div className={`space-y-5 text-slate-800 dark:text-slate-200 ${contentFontSizeClass}`}>
              {content.map((paragraph, idx) => (
                <React.Fragment key={idx}>
                  <p className="leading-relaxed font-normal">{paragraph}</p>
                  
                  {/* Mid-Article Highlight Quote Box */}
                  {idx === 1 && (
                    <div className="my-8 p-6 rounded-2xl bg-red-50/70 dark:bg-red-950/30 border-l-4 border-red-600 text-slate-800 dark:text-slate-200">
                      <Quote className="w-8 h-8 text-red-600/40 mb-2" />
                      <p className="text-base sm:text-lg font-bold italic leading-snug">
                        &ldquo;
                        {language === "bn"
                          ? "নতুন এই রূপান্তরের মধ্য দিয়ে দেশ বিশ্বমানের প্রযুক্তি ও আধুনিক অর্থনীতির কাতারে শামিল হবে।"
                          : "Through this transition, the nation firmly steps into the league of global modern knowledge-driven economies."}
                        &rdquo;
                      </p>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Tags Pill Cloud */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                {language === "bn" ? "সম্পর্কিত বিষয় বা ট্যাগ:" : "Related Tags:"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-950/50 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Emoji Reaction Counter */}
            <ReactionWidget initialReactions={article.reactions} />

            {/* Interactive Comments Section */}
            <CommentsSection newsId={article.id} />
          </div>

          {/* Right / Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Related News Card Block */}
            <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-bold uppercase tracking-wider text-slate-900 dark:text-white pb-3 mb-4 border-b-2 border-red-600 flex items-center gap-2">
                <Flame className="w-4 h-4 text-red-600" />
                {language === "bn" ? "সম্পর্কিত সংবাদ" : "Related Stories"}
              </h3>
              <div className="space-y-3">
                {relatedNews.map((rel) => (
                  <NewsCard key={rel.id} article={rel} variant="compact" />
                ))}
              </div>
            </div>

            {/* Quick Poll / Subscription Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-red-600 to-rose-700 text-white shadow-xl">
              <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full inline-block mb-3">
                NewsPulse BD App
              </span>
              <h4 className="text-lg font-black leading-snug mb-2">
                {language === "bn"
                  ? "মুহূর্তেই ব্রেকিং নিউজ নোটিফিকেশন পান"
                  : "Instant Breaking News On Your Smartphone"}
              </h4>
              <p className="text-xs text-white/80 leading-relaxed mb-4">
                {language === "bn"
                  ? "আমাদের মোবাইল অ্যাপের মাধ্যমে গুরুত্বপূর্ণ সব সংবাদের পুশ নোটিফিকেশন সবার আগে জানুন।"
                  : "Stay ahead with real-time push alerts and offline reading on Android & iOS."}
              </p>
              <button
                onClick={() =>
                  alert(
                    language === "bn"
                      ? "অ্যাপ ডাউনলোড লিংক আপনার ফোনে পাঠানো হয়েছে!"
                      : "Download link sent to your device!"
                  )
                }
                className="w-full py-2.5 rounded-xl bg-white text-red-600 font-bold text-xs hover:bg-slate-100 transition-colors shadow-md"
              >
                {language === "bn" ? "অ্যাপ ডাউনলোড করুন" : "Get Mobile App"}
              </button>
            </div>

          </div>

        </div>
      </div>
    </article>
  );
}
