"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, Heart, ShieldCheck, Award, Tv, Smartphone, CheckCircle2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { CATEGORIES } from "@/data/mockNewsData";

export default function Footer() {
  const { language } = useApp();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="w-full bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight text-white">
                News<span className="text-red-500">Pulse</span>
              </span>
              <span className="text-[10px] font-black bg-red-600 text-white px-1.5 py-0.5 rounded">
                BD
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              {language === "bn"
                ? "স্বাধীন, নিরপেক্ষ ও বস্তুনিষ্ঠ সাংবাদিকতার প্রতিশ্রুতি নিয়ে ২৪ ঘণ্টা দেশ ও প্রবাসের সর্বশেষ সংবাদ তুলে ধরছে নিউজপালস বিডি।"
                : "Committed to fearless, unbiased and investigative journalism delivering 24/7 breaking news and verified analysis from Bangladesh and across the globe."}
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {language === "bn"
                  ? "সত্যতা যাচাইকৃত সাংবাদিকতা"
                  : "Fact-Checked & Verified Journalism"}
              </span>
            </div>
          </div>

          {/* Column 2: News Categories */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-red-600 rounded-full" />
              {language === "bn" ? "সংবাদ বিভাগ" : "News Categories"}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {CATEGORIES.slice(1).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="hover:text-red-400 transition-colors py-1 flex items-center gap-1.5"
                >
                  <span className="text-slate-600">›</span>
                  <span>{language === "bn" ? cat.nameBn : cat.nameEn}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Multimedia & Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-red-600 rounded-full" />
              {language === "bn" ? "ডিজিটাল সেবা" : "Digital Services"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/videos"
                  className="hover:text-red-400 transition-colors flex items-center gap-2"
                >
                  <Tv className="w-3.5 h-3.5 text-red-500" />
                  <span>{language === "bn" ? "লাইভ ভিডিও বুলেটিন" : "Live Video Bulletins"}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/bookmarks"
                  className="hover:text-red-400 transition-colors flex items-center gap-2"
                >
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>{language === "bn" ? "সংরক্ষিত আর্টিকেল হাব" : "Saved Article Vault"}</span>
                </Link>
              </li>
              <li>
                <a
                  href="#app"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(
                      language === "bn"
                        ? "নিউজপালস বিডি মোবাইল অ্যাপ গুগল প্লে স্টোর ও অ্যাপ স্টোরে শীঘ্রই উন্মুক্ত করা হবে।"
                        : "NewsPulse BD mobile app will soon be live on Google Play & App Store."
                    );
                  }}
                  className="hover:text-red-400 transition-colors flex items-center gap-2"
                >
                  <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                  <span>{language === "bn" ? "মোবাইল অ্যাপস" : "Mobile Apps"}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-red-600 rounded-full" />
              {language === "bn" ? "প্রতিদিনের বুলেটিন" : "Daily Digest"}
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              {language === "bn"
                ? "দিনের সেরা ও গুরুত্বপূর্ণ সংবাদগুলো সরাসরি আপনার ইমেইলে পান।"
                : "Receive curated top stories and breaking alerts directly to your inbox."}
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    language === "bn" ? "আপনার ইমেইল ঠিকানা..." : "Enter your email..."
                  }
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2.5 bg-red-600 hover:bg-red-500 text-white rounded-md text-xs flex items-center justify-center transition-colors"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 p-2 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {language === "bn"
                      ? "ধন্যবাদ! সাবস্ক্রিপশন সম্পন্ন হয়েছে।"
                      : "Thank you! Successfully subscribed."}
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Editorial Footnote & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>
            © ২০২৬ নিউজপালস বিডি (NewsPulse BD)। সর্বস্বত্ব সংরক্ষিত। অনুমতি ছাড়া প্রকাশিত লেখা ও ছবি ব্যবহার নিষিদ্ধ।
          </p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">
              {language === "bn" ? "গোপনীয়তা নীতি" : "Privacy Policy"}
            </span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">
              {language === "bn" ? "ব্যবহারের শর্তাবলী" : "Terms of Service"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
