"use client";

import React, { useState } from "react";
import { MessageSquare, Send, ThumbsUp, User } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { CommentItem } from "@/types/news";

interface CommentsSectionProps {
  newsId: string;
}

export default function CommentsSection({ newsId }: CommentsSectionProps) {
  const { language } = useApp();

  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: "comm-1",
      newsId,
      authorName: "মুস্তাফিজুর রহমান",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      content:
        "অসাধারণ এবং যুগান্তকারী একটি পদক্ষেপ। তরুণ প্রজন্মের কর্মসংস্থানে এই উদ্যোগ ব্যাপক ভূমিকা রাখবে বলে আমি বিশ্বাস করি।",
      createdAt: "১ ঘণ্টা আগে",
      likes: 18,
    },
    {
      id: "comm-2",
      newsId,
      authorName: "Kazi Ashiq",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
      content:
        "Brilliant initiative! The implementation and policy transparency will be key to success.",
      createdAt: "২ ঘণ্টা আগে",
      likes: 12,
    },
  ]);

  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !commentText.trim()) return;

    const newComment: CommentItem = {
      id: `comm-${Date.now()}`,
      newsId,
      authorName: name.trim(),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
      content: commentText.trim(),
      createdAt: language === "bn" ? "এইমাত্র" : "Just now",
      likes: 0,
    };

    setComments([newComment, ...comments]);
    setName("");
    setCommentText("");
  };

  const handleLikeComment = (id: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  return (
    <section className="w-full my-10 pt-8 border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-red-600" />
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
          {language === "bn"
            ? `মন্তব্য সমূহ (${comments.length})`
            : `Comments (${comments.length})`}
        </h3>
      </div>

      {/* Add Comment Form */}
      <form
        onSubmit={handleSubmit}
        className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 mb-8 space-y-3"
      >
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {language === "bn" ? "আপনার মন্তব্য লিখুন" : "Leave a Comment"}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={language === "bn" ? "আপনার পূর্ণ নাম..." : "Your Full Name..."}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-red-500"
          />
        </div>

        <textarea
          required
          rows={3}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder={
            language === "bn"
              ? "সংবাদের বিষয়ে আপনার গঠনমূলক মতামত ব্যক্ত করুন..."
              : "Share your thoughts constructively..."
          }
          className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-red-500 resize-none"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors shadow-md shadow-red-600/20"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{language === "bn" ? "মন্তব্য পোস্ট করুন" : "Post Comment"}</span>
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comm) => (
          <div
            key={comm.id}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <img
                  src={comm.avatar}
                  alt={comm.authorName}
                  className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                    {comm.authorName}
                  </h5>
                  <span className="text-[10px] text-slate-400">{comm.createdAt}</span>
                </div>
              </div>

              <button
                onClick={() => handleLikeComment(comm.id)}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{comm.likes}</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-10.5">
              {comm.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
