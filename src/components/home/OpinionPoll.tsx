"use client";

import React, { useState } from "react";
import { Vote, CheckCircle2, BarChart3 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { MOCK_POLL } from "@/data/mockNewsData";
import { toBengaliNumber } from "@/lib/utils";

export default function OpinionPoll() {
  const { language } = useApp();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState({
    yes: MOCK_POLL.yesVotes,
    no: MOCK_POLL.noVotes,
    noOpinion: MOCK_POLL.noOpinionVotes,
    total: MOCK_POLL.totalVotes,
  });

  const handleVote = () => {
    if (!selectedOption || hasVoted) return;

    setVotes((prev) => {
      const updated = { ...prev, total: prev.total + 1 };
      if (selectedOption === "yes") updated.yes += 1;
      else if (selectedOption === "no") updated.no += 1;
      else updated.noOpinion += 1;
      return updated;
    });
    setHasVoted(true);
  };

  const calcPercent = (count: number) => {
    return Math.round((count / votes.total) * 100);
  };

  const yesPercent = calcPercent(votes.yes);
  const noPercent = calcPercent(votes.no);
  const noOpinionPercent = calcPercent(votes.noOpinion);

  const question = language === "bn" ? MOCK_POLL.questionBn : MOCK_POLL.questionEn;

  return (
    <section className="w-full py-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 shadow-md">
          {/* Header */}
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-full bg-red-600/10 dark:bg-red-950/60 text-red-600 flex items-center justify-center">
              <Vote className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
              {language === "bn" ? "অনলাইন মতামত জরিপ" : "Public Opinion Poll"}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug mb-6">
            {question}
          </h3>

          {/* Voting Options or Results */}
          {!hasVoted ? (
            <div className="space-y-3">
              {[
                { id: "yes", labelBn: "হ্যাঁ, সম্পূর্ণ একমত", labelEn: "Yes, fully agree" },
                { id: "no", labelBn: "না, একমত নই", labelEn: "No, disagree" },
                { id: "noOpinion", labelBn: "মন্তব্য নেই", labelEn: "No opinion" },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedOption === opt.id
                      ? "border-red-600 bg-red-50/50 dark:bg-red-950/30 text-red-600 dark:text-red-400 font-semibold"
                      : "border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="opinionPoll"
                    value={opt.id}
                    checked={selectedOption === opt.id}
                    onChange={() => setSelectedOption(opt.id)}
                    className="w-4 h-4 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm">
                    {language === "bn" ? opt.labelBn : opt.labelEn}
                  </span>
                </label>
              ))}

              <button
                onClick={handleVote}
                disabled={!selectedOption}
                className={`w-full py-3 rounded-xl font-bold text-sm shadow-md transition-all mt-4 flex items-center justify-center gap-2 ${
                  selectedOption
                    ? "bg-red-600 hover:bg-red-500 text-white cursor-pointer"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed"
                }`}
              >
                <Vote className="w-4 h-4" />
                <span>{language === "bn" ? "ভোট দিন" : "Submit Vote"}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Results Bars */}
              {[
                { labelBn: "হ্যাঁ", labelEn: "Yes", percent: yesPercent, color: "bg-emerald-500" },
                { labelBn: "না", labelEn: "No", percent: noPercent, color: "bg-red-500" },
                { labelBn: "মন্তব্য নেই", labelEn: "No Opinion", percent: noOpinionPercent, color: "bg-slate-400" },
              ].map((res) => (
                <div key={res.labelEn} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>{language === "bn" ? res.labelBn : res.labelEn}</span>
                    <span>
                      {language === "bn" ? `${toBengaliNumber(res.percent)}%` : `${res.percent}%`}
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${res.color} transition-all duration-1000`}
                      style={{ width: `${res.percent}%` }}
                    />
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  {language === "bn" ? "আপনার ভোট গ্রহণ করা হয়েছে!" : "Your vote was registered!"}
                </span>
                <span>
                  {language === "bn"
                    ? `সর্বমোট ভোট: ${toBengaliNumber(votes.total)}`
                    : `Total Votes: ${votes.total.toLocaleString()}`}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
