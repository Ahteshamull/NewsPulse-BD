import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import MainLayout from "@/components/layout/MainLayout";

export const metadata: Metadata = {
  title: "NewsPulse BD | সত্য ও নির্ভীক সাংবাদিকতার কণ্ঠস্বর",
  description:
    "NewsPulse BD — বাংলাদেশ ও বিশ্বের সর্বশেষ ব্রেকিং নিউজ, রাজনীতি, অর্থনীতি, খেলাধুলা ও প্রযুক্তির বিশ্বস্ত ডিজিটাল সংবাদ মাধ্যম।",
  keywords: [
    "Bangla News",
    "Bangladesh News",
    "NewsPulse BD",
    "Breaking News BD",
    "Dhaka News",
    "Bangladeshi News Portal",
  ],
  authors: [{ name: "NewsPulse Media Ltd." }],
  openGraph: {
    title: "NewsPulse BD — আধুনিক ডিজিটাল নিউজ পোর্টাল",
    description: "২৪ ঘণ্টা দেশ ও প্রবাসের সর্বশেষ সংবাদের নির্ভরযোগ্য প্ল্যাটফর্ম",
    siteName: "NewsPulse BD",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className="antialiased selection:bg-red-500 selection:text-white">
        <AppProvider>
          <MainLayout>{children}</MainLayout>
        </AppProvider>
      </body>
    </html>
  );
}
