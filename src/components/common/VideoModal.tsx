"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Clock, Eye, Share2 } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function VideoModal() {
  const { activeVideo, setActiveVideo, language } = useApp();

  if (!activeVideo) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl text-white"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
              <span className="text-xs uppercase tracking-wider font-semibold text-red-500">
                {language === "bn" ? activeVideo.categoryBn : activeVideo.categoryEn}
              </span>
            </div>
            <button
              onClick={() => setActiveVideo(null)}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="Close video player"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Video Player Frame / Visual Demonstration */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden group">
            <img
              src={activeVideo.thumbnail}
              alt={activeVideo.titleBn}
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            {/* Play Button Overlay */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl hover:bg-red-500 hover:scale-110 transition-all cursor-pointer">
                <Play className="w-8 h-8 ml-1 fill-white" />
              </div>
              <p className="mt-3 text-sm text-slate-300 font-medium">
                {language === "bn" ? "ভিডিও দেখতে প্লে করুন" : "Click to Play Video Stream"}
              </p>
            </div>

            {/* Video Duration Badge */}
            <div className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded bg-black/80 text-xs font-medium flex items-center gap-1.5 border border-white/10">
              <Clock className="w-3.5 h-3.5 text-red-500" />
              <span>{activeVideo.videoDuration}</span>
            </div>
          </div>

          {/* Video Details Info */}
          <div className="p-6 bg-slate-900">
            <h3 className="text-xl sm:text-2xl font-bold leading-snug">
              {language === "bn" ? activeVideo.titleBn : activeVideo.titleEn}
            </h3>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {language === "bn" ? activeVideo.publishedTimeBn : activeVideo.publishedTimeEn}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {language === "bn" ? activeVideo.viewsBn : activeVideo.viewsEn}
              </span>
            </div>

            <p className="mt-4 text-sm text-slate-300 leading-relaxed">
              {language === "bn" ? activeVideo.descriptionBn : activeVideo.descriptionEn}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
