import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toBengaliNumber(num: number | string): string {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
}

export function formatViews(views: number, lang: "bn" | "en"): string {
  if (views >= 100000) {
    const lakh = (views / 100000).toFixed(1);
    return lang === "bn" ? `${toBengaliNumber(lakh)} লাখ ভিউ` : `${lakh}L views`;
  }
  if (views >= 1000) {
    const k = (views / 1000).toFixed(1);
    return lang === "bn" ? `${toBengaliNumber(k)} হাজার ভিউ` : `${k}k views`;
  }
  return lang === "bn" ? `${toBengaliNumber(views)} ভিউ` : `${views} views`;
}
