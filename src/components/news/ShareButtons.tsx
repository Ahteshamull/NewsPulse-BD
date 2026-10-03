"use client";

import React, { useState } from "react";
import { Share2, Link2, Check, MessageSquare } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function ShareButtons({ title }: { title: string }) {
  const { language } = useApp();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleShare = (platform: "facebook" | "twitter" | "whatsapp") => {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);

    let shareUrl = "";
    if (platform === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (platform === "twitter") {
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    } else if (platform === "whatsapp") {
      shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold mr-1 flex items-center gap-1">
        <Share2 className="w-3.5 h-3.5" />
        {language === "bn" ? "শেয়ার:" : "Share:"}
      </span>

      {/* Facebook */}
      <button
        onClick={() => handleShare("facebook")}
        className="p-2 rounded-xl bg-blue-600/10 hover:bg-blue-600 text-blue-600 hover:text-white transition-all duration-200"
        title="Share on Facebook"
        aria-label="Share on Facebook"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </button>

      {/* Twitter / X */}
      <button
        onClick={() => handleShare("twitter")}
        className="p-2 rounded-xl bg-slate-900/10 hover:bg-slate-900 text-slate-900 dark:text-white hover:text-white dark:bg-white/10 dark:hover:bg-white dark:hover:text-black transition-all duration-200"
        title="Share on X"
        aria-label="Share on X"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>

      {/* WhatsApp */}
      <button
        onClick={() => handleShare("whatsapp")}
        className="p-2 rounded-xl bg-emerald-600/10 hover:bg-emerald-600 text-emerald-600 hover:text-white transition-all duration-200"
        title="Share on WhatsApp"
        aria-label="Share on WhatsApp"
      >
        <MessageSquare className="w-4 h-4" />
      </button>

      {/* Copy Link with Toast Indicator */}
      <button
        onClick={handleCopyLink}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
          copied
            ? "bg-emerald-600 text-white"
            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
        }`}
        title="Copy Link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5" />
            <span>{language === "bn" ? "কপি হয়েছে!" : "Copied!"}</span>
          </>
        ) : (
          <>
            <Link2 className="w-3.5 h-3.5" />
            <span>{language === "bn" ? "লিংক কপি" : "Copy Link"}</span>
          </>
        )}
      </button>
    </div>
  );
}
