"use client";

import React from "react";
import Link from "next/link";
import { Play, Clock, Eye, Video, ChevronRight } from "lucide-react";
import { VideoArticle } from "@/types/news";
import { useApp } from "@/context/AppContext";

interface VideoSectionProps {
  videos: VideoArticle[];
}

export default function VideoSection({ videos }: VideoSectionProps) {
  const { language, setActiveVideo } = useApp();

  return (
    <section className="w-full py-10 bg-slate-950 text-white border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/40">
              <Video className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                {language === "bn" ? "ভিডিও সংবাদ ও বুলেটিন" : "Video News & Bulletins"}
              </h2>
              <p className="text-xs text-slate-400">
                {language === "bn"
                  ? "সরাসরি গ্রাউন্ড জিরো থেকে সংগৃহীত বিশেষ ভিডিও প্রতিবেদন"
                  : "Investigative visual stories and broadcast dispatches"}
              </p>
            </div>
          </div>

          <Link
            href="/videos"
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-red-500 hover:text-red-400 transition-colors group"
          >
            <span>{language === "bn" ? "সব ভিডিও দেখুন" : "View All"}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {videos.map((vid) => {
            const title = language === "bn" ? vid.titleBn : vid.titleEn;
            const time = language === "bn" ? vid.publishedTimeBn : vid.publishedTimeEn;
            const views = language === "bn" ? vid.viewsBn : vid.viewsEn;

            return (
              <div
                key={vid.id}
                onClick={() => setActiveVideo(vid)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-red-600/70 transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col justify-between"
              >
                {/* Thumbnail with Play Icon & Duration */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-800">
                  <img
                    src={vid.thumbnail}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                  {/* Play Button Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-600/90 group-hover:bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded text-[11px] font-medium bg-black/80 text-white backdrop-blur-xs flex items-center gap-1">
                    <Clock className="w-3 h-3 text-red-500" />
                    <span>{vid.videoDuration}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h3 className="text-sm font-bold text-slate-100 group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                    {title}
                  </h3>

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
    </section>
  );
}
