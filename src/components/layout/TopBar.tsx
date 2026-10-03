"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon, Globe, CloudSun, DollarSign, Newspaper, Radio } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function TopBar() {
  const { language, toggleLanguage, theme, toggleTheme } = useApp();
  const [currentDate, setCurrentDate] = useState({
    bn: "শনিবার, ৩ অক্টোবর ২০২৬",
    en: "Saturday, Oct 3, 2026",
  });

  return (
    <div className="w-full bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Left Side: Date & Weather & Finance */}
        <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {language === "bn" ? currentDate.bn : currentDate.en}
          </span>

          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>

          {/* Weather Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-medium">
            <CloudSun className="w-3.5 h-3.5" />
            <span>{language === "bn" ? "ঢাকা ২৮° সে." : "Dhaka 28°C"}</span>
          </div>

          <span className="hidden md:inline text-slate-300 dark:text-slate-700">|</span>

          {/* Forex Indicator */}
          <div className="hidden md:flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <DollarSign className="w-3 h-3" />
            <span>{language === "bn" ? "$ ১ = ১২১.৫০ ৳" : "$1 = 121.50 BDT"}</span>
          </div>
        </div>

        {/* Right Side: Quick Services, Language Switcher & Dark Mode */}
        <div className="flex items-center gap-2 sm:gap-4 ml-auto">
          {/* E-Paper Link */}
          <a
            href="#epaper"
            onClick={(e) => {
              e.preventDefault();
              alert(
                language === "bn"
                  ? "ই-পেপার সংস্করণ শীঘ্রই আসছে!"
                  : "E-Paper digital edition coming soon!"
              );
            }}
            className="hidden sm:flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <Newspaper className="w-3.5 h-3.5 text-red-600" />
            <span>{language === "bn" ? "ই-পেপার" : "E-Paper"}</span>
          </a>

          {/* Live Audio Stream Link */}
          <button
            onClick={() => {
              alert(
                language === "bn"
                  ? "লাইভ অনলাইন রেডিও স্ট্রিমিং চালু হচ্ছে..."
                  : "Connecting to Live Online Radio stream..."
              );
            }}
            className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span className="hidden xs:inline">{language === "bn" ? "রেডিও" : "Radio"}</span>
          </button>

          <span className="text-slate-300 dark:text-slate-700">|</span>

          {/* Language Switcher Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/40 text-slate-800 dark:text-slate-200 transition-colors font-medium border border-transparent hover:border-red-200 dark:hover:border-red-900"
            title="Switch Language"
          >
            <Globe className="w-3 h-3 text-red-600" />
            <span>{language === "bn" ? "English" : "বাংলা"}</span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1 rounded-full text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Theme"
            title={theme === "dark" ? "Light Mode" : "Dark Mode"}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
