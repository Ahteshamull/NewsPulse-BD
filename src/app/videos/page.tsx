"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Play, Video, Clock, Eye, Radio, Sparkles } from "lucide-react";
import { MOCK_VIDEOS } from "@/data/mockNewsData";
import { useApp } from "@/context/AppContext";

export default function VideosPage() {
  const { language, setActiveVideo } = useApp();
  const [selectedFilter, setSelectedFilter] = useState("all");

  const featuredVideo = MOCK_VIDEOS[0];

  return (
    <div className="w-full py-8 sm:py-12 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-8 bg-red-600 rounded-sm" />
              <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white flex items-center gap-3">
                {language === "bn" ? "ভিডিও নিউজ হাব" : "Video News Hub"}
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-600 text-white uppercase tracking-widest font-black flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  Live TV
                </span>
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 pl-6">
              {language === "bn"
                ? "বিশেষ অনুসন্ধানী রিপোর্ট, স্টুডিও আলোচনা এবং লাইভ ভিডিও বুলেটিন"
                : "Investigative video documentaries, live debates, and breaking dispatches"}
            </p>
          </div>
        </div>

        {/* Featured Big Live Stream Cinema Showcase */}
        {featuredVideo && (
          <div
            onClick={() => setActiveVideo(featuredVideo)}
            className="group cursor-pointer relative aspect-video md:aspect-[21/9] w-full rounded-3xl overflow-hidden mb-12 shadow-2xl border border-slate-800 hover:border-red-600/80 transition-all duration-500 bg-slate-900"
          >
            <img
              src={featuredVideo.thumbnail}
              alt={language === "bn" ? featuredVideo.titleBn : featuredVideo.titleEn}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Live TV Badge Overlay */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                {language === "bn" ? "লাইভ কভারেজ" : "Live Coverage"}
              </span>
            </div>

            {/* Giant Play Icon Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600/90 group-hover:bg-red-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all">
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1" />
              </div>
            </div>

            {/* Bottom Title & Stats */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8">
              <span className="text-xs text-red-400 font-bold uppercase tracking-wider mb-2 block">
                {language === "bn" ? featuredVideo.categoryBn : featuredVideo.categoryEn}
              </span>
              <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white group-hover:text-red-400 transition-colors max-w-3xl leading-snug">
                {language === "bn" ? featuredVideo.titleBn : featuredVideo.titleEn}
              </h2>
              <div className="flex items-center gap-4 mt-3 text-xs text-slate-300">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-red-500" />
                  {language === "bn" ? featuredVideo.publishedTimeBn : featuredVideo.publishedTimeEn}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {language === "bn" ? featuredVideo.viewsBn : featuredVideo.viewsEn}
                </span>
                <span>•</span>
                <span className="font-semibold text-red-400">
                  {featuredVideo.videoDuration}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Video Gallery Grid */}
        <div className="mb-6 flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Video className="w-5 h-5 text-red-500" />
            {language === "bn" ? "সকল ভিডিও প্রতিবেদন" : "All Video Reports"}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_VIDEOS.map((vid) => {
            const title = language === "bn" ? vid.titleBn : vid.titleEn;
            const time = language === "bn" ? vid.publishedTimeBn : vid.publishedTimeEn;
            const views = language === "bn" ? vid.viewsBn : vid.viewsEn;

            return (
              <div
                key={vid.id}
                onClick={() => setActiveVideo(vid)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-red-600/70 transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col justify-between"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-slate-800">
                  <img
                    src={vid.thumbnail}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-600/90 group-hover:bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>

                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded text-[11px] font-medium bg-black/80 text-white backdrop-blur-xs flex items-center gap-1">
                    <Clock className="w-3 h-3 text-red-500" />
                    <span>{vid.videoDuration}</span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 mb-1 block">
                      {language === "bn" ? vid.categoryBn : vid.categoryEn}
                    </span>
                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                      {title}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                    <span>{time}</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {views}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
