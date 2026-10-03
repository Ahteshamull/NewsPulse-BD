import React from "react";
import BreakingTicker from "@/components/home/BreakingTicker";
import LeadHeroSection from "@/components/home/LeadHeroSection";
import TrendingSection from "@/components/home/TrendingSection";
import CategorySection from "@/components/home/CategorySection";
import VideoSection from "@/components/home/VideoSection";
import OpinionPoll from "@/components/home/OpinionPoll";
import { MOCK_ARTICLES, MOCK_VIDEOS } from "@/data/mockNewsData";

export default function HomePage() {
  const leadArticle = MOCK_ARTICLES[0];
  const secondaryArticles = [MOCK_ARTICLES[1], MOCK_ARTICLES[2]];
  const latestArticles = MOCK_ARTICLES;

  // Filter categories
  const nationalArticles = MOCK_ARTICLES.filter((a) => a.category === "national");
  const sportsArticles = MOCK_ARTICLES.filter((a) => a.category === "sports");
  const businessArticles = MOCK_ARTICLES.filter((a) => a.category === "business");
  const techArticles = MOCK_ARTICLES.filter((a) => a.category === "tech");

  return (
    <div className="flex flex-col w-full">
      {/* 1. Breaking News Ticker */}
      <BreakingTicker />

      {/* 2. Editorial Lead Hero Section & 24/7 Live Timeline */}
      <LeadHeroSection
        leadArticle={leadArticle}
        secondaryArticles={secondaryArticles}
        latestArticles={latestArticles}
      />

      {/* 3. Trending News Section (Ranked 01 to 05) */}
      <TrendingSection articles={MOCK_ARTICLES} />

      {/* 4. National News Section */}
      <CategorySection
        titleBn="জাতীয় সংবাদ"
        titleEn="National News"
        slug="national"
        articles={nationalArticles.length > 0 ? nationalArticles : MOCK_ARTICLES.slice(0, 4)}
      />

      {/* 5. Video News & Bulletin Hub */}
      <VideoSection videos={MOCK_VIDEOS} />

      {/* 6. Sports News Section */}
      <CategorySection
        titleBn="খেলাধুলা"
        titleEn="Sports World"
        slug="sports"
        articles={sportsArticles.length > 0 ? sportsArticles : MOCK_ARTICLES.slice(1, 5)}
      />

      {/* 7. Economy & Business Section */}
      <CategorySection
        titleBn="অর্থনীতি ও বাণিজ্য"
        titleEn="Economy & Business"
        slug="business"
        articles={businessArticles.length > 0 ? businessArticles : MOCK_ARTICLES.slice(2, 6)}
      />

      {/* 8. Tech & Innovation Section */}
      <CategorySection
        titleBn="তথ্যপ্রযুক্তি ও বিজ্ঞান"
        titleEn="Tech & Science"
        slug="tech"
        articles={techArticles.length > 0 ? techArticles : MOCK_ARTICLES.slice(3, 7)}
      />

      {/* 9. Live Public Opinion Poll Widget */}
      <OpinionPoll />
    </div>
  );
}
