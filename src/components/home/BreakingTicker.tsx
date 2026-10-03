"use client";

import React from "react";
import Link from "next/link";
import { Zap, Flame, ChevronRight } from "lucide-react";
import { BREAKING_NEWS } from "@/data/mockNewsData";
import { useApp } from "@/context/AppContext";

export default function BreakingTicker() {
  const { language } = useApp();

  return (
    <div className="w-full bg-slate-900 text-white border-b border-red-950 overflow-hidden shadow-xs">
      <div className="max-w-7xl mx-auto flex items-stretch">
        {/* Fixed Red Badge */}
        <div className="relative z-10 flex items-center gap-2 px-3 sm:px-5 py-2.5 bg-red-600 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shrink-0 shadow-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
          <Zap className="w-4 h-4 fill-white" />
          <span className="whitespace-nowrap">
            {language === "bn" ? "ব্রেকিং নিউজ" : "Breaking News"}
          </span>
          {/* Angled wedge design */}
          <div className="hidden sm:block absolute top-0 -right-2 bottom-0 w-3 bg-red-600 skew-x-[-18deg]" />
        </div>

        {/* Scrolling Ticker Line */}
        <div className="flex-1 overflow-hidden relative flex items-center py-2.5 bg-slate-950/80">
          <div className="animate-ticker flex items-center gap-8 whitespace-nowrap">
            {/* Duplicate list to make infinite continuous loop */}
            {[...BREAKING_NEWS, ...BREAKING_NEWS].map((item, idx) => {
              const title = language === "bn" ? item.titleBn : item.titleEn;
              const time = language === "bn" ? item.timeBn : item.timeEn;
              return (
                <Link
                  key={`${item.id}-${idx}`}
                  href={`/news/${item.slug}`}
                  className="group flex items-center gap-2 text-xs sm:text-sm text-slate-200 hover:text-red-400 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span className="font-semibold text-slate-100 group-hover:underline">
                    {title}
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    ({time})
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
