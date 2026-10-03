"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function AudioReader({ title }: { title: string }) {
  const { language } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState<number>(1);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 300 / speed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, speed]);

  const toggleSpeed = () => {
    if (speed === 1) setSpeed(1.25);
    else if (speed === 1.25) setSpeed(1.5);
    else setSpeed(1);
  };

  return (
    <div className="w-full my-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-500/10 via-slate-100 to-slate-100 dark:from-red-950/40 dark:via-slate-800/80 dark:to-slate-800/80 border border-red-200 dark:border-red-900/40 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Play Control & AI Voice Tag */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-600/30 transition-all shrink-0"
            aria-label={isPlaying ? "Pause narration" : "Play narration"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-white" />
            ) : (
              <Play className="w-5 h-5 fill-white ml-0.5" />
            )}
          </button>

          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {language === "bn"
                  ? "এআই ভয়েস অডিও বুলেটিন"
                  : "AI Smart Voice Narration"}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              {isPlaying
                ? language === "bn"
                  ? "সংবাদটি অডিওতে চলছে..."
                  : "Playing audio summary..."
                : language === "bn"
                ? "ক্লিক করে সম্পূর্ণ সংবাদটি শুনুন (২ মি.)"
                : "Listen to full article narration (2m)"}
            </p>
          </div>
        </div>

        {/* Speed & Mute Options */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={toggleSpeed}
            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 transition-colors"
          >
            {speed}x
          </button>

          <button
            onClick={() => setMuted(!muted)}
            className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 transition-colors"
            title={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <VolumeX className="w-4 h-4 text-red-500" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Progress Track */}
      <div className="mt-4 relative w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden cursor-pointer">
        <div
          className="h-full bg-red-600 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
