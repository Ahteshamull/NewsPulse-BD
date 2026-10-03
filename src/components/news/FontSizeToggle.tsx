"use client";

import React from "react";
import { useApp, ArticleFontSize } from "@/context/AppContext";

export default function FontSizeToggle() {
  const { fontSize, setFontSize, language } = useApp();

  const sizes: { id: ArticleFontSize; label: string }[] = [
    { id: "sm", label: "A-" },
    { id: "base", label: "A" },
    { id: "lg", label: "A+" },
  ];

  return (
    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
      <span className="text-[11px] text-slate-500 dark:text-slate-400 px-2 font-medium">
        {language === "bn" ? "হরফ:" : "Text:"}
      </span>
      {sizes.map((s) => (
        <button
          key={s.id}
          onClick={() => setFontSize(s.id)}
          className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all ${
            fontSize === s.id
              ? "bg-white dark:bg-slate-900 text-red-600 shadow-xs"
              : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
