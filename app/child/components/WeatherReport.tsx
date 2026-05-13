"use client";

import { useState } from "react";
import { ArrowRight, MessageCircle, Brain, Activity, Heart, Zap } from "lucide-react";
import type { AppState } from "../page";

interface Props {
  step: number;
  appState: AppState;
  updateState: (updates: Partial<AppState>) => void;
  onNext: () => void;
}

export default function WeatherReport({ step, appState, updateState, onNext }: Props) {
  const [localInput, setLocalInput] = useState("");

  const config = {
    2: {
      title: "เกิดอะไรขึ้น?",
      subtitle: "มีอะไรพัดพาเมฆก้อนนี้มาที่ท้องฟ้าของเธอเหรอ?",
      icon: MessageCircle,
      field: "situation" as const,
      placeholder: "เช่น... เพื่อนไม่ยอมเล่นด้วย, สอบได้คะแนนไม่ดี...",
      color: "text-blue-500"
    },
    3: {
      title: "เสียงกระซิบในหัว",
      subtitle: "ตอนนั้น สมองของเธอกระซิบว่าอะไรอยู่?",
      icon: Brain,
      field: "thought" as const,
      placeholder: "เช่น... 'ไม่มีใครชอบเราแน่เลย', 'ฉันทำไม่ได้หรอก'...",
      color: "text-purple-500"
    },
    4: {
      title: "สำรวจสภาพอากาศในร่างกาย",
      subtitle: "ร่างกายของเธอรู้สึกยังไงบ้าง? (เช่น ร้อนผ่าวเหมือนเตาไฟ, หนักเหมือนก้อนหิน)",
      icon: Activity,
      field: "sensation" as const,
      placeholder: "เช่น... มือสั่น, หัวใจเต้นแรง, รู้สึกหน่วงๆที่ท้อง...",
      color: "text-rose-500"
    },
    5: {
      title: "ตั้งชื่อความรู้สึก",
      subtitle: "ถ้าให้ตั้งชื่อความรู้สึกนี้ เธอจะเรียกมันว่าอะไร?",
      icon: Heart,
      field: "feeling" as const,
      placeholder: "เช่น... โกรธ, เศร้าจัง, กลัวจังเลย...",
      color: "text-pink-500"
    },
    6: {
      title: "ร่างกายอยากทำอะไร?",
      subtitle: "ความรู้สึกนี้ ทำให้ร่างกายอยากแสดงออกยังไง?",
      icon: Zap,
      field: "behavior" as const,
      placeholder: "เช่น... อยากร้องไห้, อยากตะโกน, อยากวิ่งหนี...",
      color: "text-amber-500"
    }
  };

  const currentConfig = config[step as keyof typeof config];
  const Icon = currentConfig?.icon;

  const handleNext = () => {
    if (localInput.trim() === "") return;
    updateState({ [currentConfig.field]: localInput });
    setLocalInput("");
    onNext();
  };

  if (!currentConfig) return null;

  return (
    <div className="glass-panel p-8 flex flex-col items-center w-full shadow-2xl">
      <div className={`w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 shadow-md ${currentConfig.color}`}>
        <Icon size={40} />
      </div>
      
      <h2 className="text-3xl font-bold mb-3 text-slate-800 text-center">{currentConfig.title}</h2>
      <p className="text-slate-600 mb-8 font-medium text-lg text-center max-w-md">
        {currentConfig.subtitle}
      </p>

      <textarea
        value={localInput}
        onChange={(e) => setLocalInput(e.target.value)}
        placeholder={currentConfig.placeholder}
        className="w-full bg-white/80 border-2 border-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 rounded-2xl p-6 text-lg text-slate-700 shadow-inner resize-none transition-all outline-none"
        rows={3}
      />

      <button
        onClick={handleNext}
        disabled={localInput.trim() === ""}
        className="mt-8 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg w-full justify-center text-lg"
      >
        <span>ไปต่อกันเถอะ</span>
        <ArrowRight size={24} />
      </button>
    </div>
  );
}
