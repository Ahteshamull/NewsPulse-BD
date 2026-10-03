"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { VideoArticle } from "@/types/news";

export type Language = "bn" | "en";
export type Theme = "light" | "dark";
export type ArticleFontSize = "sm" | "base" | "lg" | "xl";

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  theme: Theme;
  toggleTheme: () => void;
  bookmarks: string[]; // array of article slugs
  toggleBookmark: (slug: string) => boolean; // returns true if added, false if removed
  isBookmarked: (slug: string) => boolean;
  fontSize: ArticleFontSize;
  setFontSize: (size: ArticleFontSize) => void;
  activeVideo: VideoArticle | null;
  setActiveVideo: (video: VideoArticle | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("bn");
  const [theme, setTheme] = useState<Theme>("light");
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [fontSize, setFontSize] = useState<ArticleFontSize>("base");
  const [activeVideo, setActiveVideo] = useState<VideoArticle | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    setMounted(true);
    try {
      const savedLang = localStorage.getItem("newspulse_lang") as Language | null;
      if (savedLang === "bn" || savedLang === "en") {
        setLanguage(savedLang);
      }

      const savedTheme = localStorage.getItem("newspulse_theme") as Theme | null;
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.classList.toggle("dark", savedTheme === "dark");
      } else if (prefersDark) {
        setTheme("dark");
        document.documentElement.classList.add("dark");
      }

      const savedBookmarks = localStorage.getItem("newspulse_bookmarks");
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === "bn" ? "en" : "bn";
      try {
        localStorage.setItem("newspulse_lang", next);
      } catch {
        // ignore
      }
      return next;
    });
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      try {
        localStorage.setItem("newspulse_theme", next);
      } catch {
        // ignore
      }
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  };

  const toggleBookmark = (slug: string): boolean => {
    let isAdded = false;
    setBookmarks((prev) => {
      let updated: string[];
      if (prev.includes(slug)) {
        updated = prev.filter((item) => item !== slug);
        isAdded = false;
      } else {
        updated = [slug, ...prev];
        isAdded = true;
      }
      try {
        localStorage.setItem("newspulse_bookmarks", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    return isAdded;
  };

  const isBookmarked = (slug: string) => {
    return bookmarks.includes(slug);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage: (lang) => {
          setLanguage(lang);
          try {
            localStorage.setItem("newspulse_lang", lang);
          } catch {}
        },
        toggleLanguage,
        theme,
        toggleTheme,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        fontSize,
        setFontSize,
        activeVideo,
        setActiveVideo,
        isSearchOpen,
        setIsSearchOpen,
      }}
    >
      <div className={mounted && theme === "dark" ? "dark" : ""}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
