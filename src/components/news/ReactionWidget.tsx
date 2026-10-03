"use client";

import React, { useState } from "react";
import { ThumbsUp, Heart, Frown, Sparkles } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { toBengaliNumber } from "@/lib/utils";

interface ReactionWidgetProps {
  initialReactions: {
    like: number;
    love: number;
    surprised: number;
    sad: number;
  };
}

export default function ReactionWidget({ initialReactions }: ReactionWidgetProps) {
  const { language } = useApp();
  const [reactions, setReactions] = useState(initialReactions);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);

  const handleReaction = (type: "like" | "love" | "surprised" | "sad") => {
    if (selectedReaction === type) {
      setReactions((prev) => ({ ...prev, [type]: prev[type] - 1 }));
      setSelectedReaction(null);
    } else {
      setReactions((prev) => {
        const next = { ...prev };
        if (selectedReaction) {
          next[selectedReaction as keyof typeof next] -= 1;
        }
        next[type] += 1;
        return next;
      });
      setSelectedReaction(type);
    }
  };

  const reactionList = [
    { id: "like", emoji: "👍", labelBn: "লাইক", labelEn: "Like", count: reactions.like },
    { id: "love", emoji: "❤️", labelBn: "চমৎকার", labelEn: "Love", count: reactions.love },
    { id: "surprised", emoji: "😲", labelBn: "অবাক", labelEn: "Wow", count: reactions.surprised },
    { id: "sad", emoji: "😢", labelBn: "দুঃখজনক", labelEn: "Sad", count: reactions.sad },
  ];

  return (
    <div className="w-full my-8 p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 text-center">
        {language === "bn"
          ? "এই সংবাদটিতে আপনার প্রতিক্রিয়া কী?"
          : "What is your reaction to this story?"}
      </h4>

      <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
        {reactionList.map((item) => {
          const isSelected = selectedReaction === item.id;
          return (
            <button
              key={item.id}
              onClick={() =>
                handleReaction(item.id as "like" | "love" | "surprised" | "sad")
              }
              className={`flex flex-col items-center gap-1 px-4 py-2.5 rounded-2xl border transition-all transform hover:scale-105 ${
                isSelected
                  ? "bg-red-50 dark:bg-red-950/40 border-red-500 scale-105 shadow-sm"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300"
              }`}
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                {language === "bn" ? item.labelBn : item.labelEn}
              </span>
              <span className="text-xs font-bold text-red-600 dark:text-red-400">
                {language === "bn"
                  ? toBengaliNumber(item.count)
                  : item.count.toLocaleString()}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
