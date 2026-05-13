"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wind, Hand, Citrus, ArrowRight, Sparkles, RefreshCcw } from "lucide-react";
import type { AppState, SkyTone } from "../page";
import SkyToneSelector from "./SkyToneSelector";

interface Props {
  step: number;
  appState: AppState;
  updateState: (updates: Partial<AppState>) => void;
  onNext: () => void;
}

export default function SelfRegulation({ step, appState, updateState, onNext }: Props) {
  const [breathingPhase, setBreathingPhase] = useState<"in" | "hold" | "out">("in");
  const [breathCount, setBreathCount] = useState(0);
  const [showFinalCheck, setShowFinalCheck] = useState(false);

  // Helper to get visitor name
  const getVisitorName = () => {
    switch (appState.skyTone) {
      case "sunny": return "Spark";
      case "cloudy": return "Muffle";
      case "rainy": return "Puddles";
      case "stormy": return "Fizz";
      default: return "Blob";
    }
  };

  const visitorName = getVisitorName();

  // Page 11 Breathing Logic
  useEffect(() => {
    if (step === 11 && breathCount < 3) {
      const timer = setTimeout(() => {
        if (breathingPhase === "in") setBreathingPhase("hold");
        else if (breathingPhase === "hold") setBreathingPhase("out");
        else {
          setBreathingPhase("in");
          setBreathCount(prev => prev + 1);
        }
      }, 3000); // 3 seconds per phase
      return () => clearTimeout(timer);
    }
  }, [step, breathingPhase, breathCount]);

  if (step === 9) {
    return (
      <div className="glass-panel p-8 text-center shadow-2xl relative">
        <h2 className="text-3xl font-bold mb-4 text-slate-800">มาช่วย {visitorName} กันเถอะ</h2>
        <p className="text-slate-600 mb-8 font-medium text-lg leading-relaxed">
          เธอเล่าว่า {visitorName} กำลังส่งเสียงดังเพราะ <strong>"{appState.situation}"</strong><br/><br/>
          พร้อมที่จะหาวิธีทำให้ {visitorName} สงบลงแล้วหรือยัง?
        </p>
        <button
          onClick={onNext}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full flex items-center gap-2 mx-auto transition-all transform hover:scale-105 shadow-lg"
        >
          <span>พร้อมแล้ว!</span>
          <ArrowRight size={24} />
        </button>
      </div>
    );
  }

  if (step === 10) {
    const tools = [
      { id: "dragon", icon: Wind, label: "ลมหายใจมังกร", desc: "เป่าไฟความโกรธออกไป" },
      { id: "lemon", icon: Citrus, label: "บีบมะนาว", desc: "เกร็งแล้วคลายกล้ามเนื้อ" },
      { id: "wall", icon: Hand, label: "ผลักกำแพง", desc: "ระบายพลังงานส่วนเกิน" }
    ];

    return (
      <div className="glass-panel p-8 text-center shadow-2xl w-full">
        <h2 className="text-3xl font-bold mb-2 text-slate-800">เครื่องมือวิเศษแห่งท้องฟ้า</h2>
        <p className="text-slate-600 mb-8 font-medium text-lg">เลือกเวทมนตร์ 1 อย่างเพื่อช่วยให้ท้องฟ้าใสขึ้นนะ</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tools.map(({ id, icon: Icon, label, desc }) => (
            <button
              key={id}
              onClick={onNext} // For MVP, all tools lead to the same breathing exercise
              className="bg-white/80 hover:bg-white border-2 border-transparent hover:border-blue-300 p-6 rounded-3xl flex flex-col items-center gap-3 transition-all transform hover:scale-105 shadow-md"
            >
              <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center">
                <Icon size={32} />
              </div>
              <span className="font-bold text-slate-700 text-xl">{label}</span>
              <span className="text-sm text-slate-500 font-medium">{desc}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === 11) {
    return (
      <div className="glass-panel p-10 text-center shadow-2xl relative w-full flex flex-col items-center min-h-[450px] justify-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-800 z-20">ลมหายใจมังกร</h2>
        
        {breathCount < 3 ? (
          <div className="flex flex-col items-center justify-center flex-1 w-full my-8">
            <div className="relative w-72 h-72 flex items-center justify-center">
              <motion.div 
                className="w-48 h-48 rounded-full flex items-center justify-center absolute"
                animate={{ 
                  scale: breathingPhase === "in" ? 1.5 : breathingPhase === "out" ? 1 : 1.5,
                  backgroundColor: breathingPhase === "in" ? "#bfdbfe" : breathingPhase === "hold" ? "#93c5fd" : "#dbeafe"
                }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
              <span className="text-2xl font-bold text-blue-800 z-10 drop-shadow-sm">
                {breathingPhase === "in" && "สูดหายใจเข้า..."}
                {breathingPhase === "hold" && "กลั้นไว้..."}
                {breathingPhase === "out" && "เป่าออกช้าๆ..."}
              </span>
            </div>
            <p className="text-slate-500 font-medium mt-4 z-20 relative">รอบที่ {breathCount + 1} / 3</p>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
            <Sparkles size={64} className="text-amber-400 mb-4" />
            <p className="text-2xl font-bold text-slate-700 mb-6">เก่งมาก! เธอทำได้เยี่ยมเลย</p>
            <button
              onClick={onNext}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg"
            >
              <span>ไปดูกันว่า {visitorName} เป็นยังไงบ้าง</span>
              <ArrowRight size={24} />
            </button>
          </motion.div>
        )}
      </div>
    );
  }

  if (step === 12) {
    if (showFinalCheck) {
      return (
        <div className="w-full">
          <SkyToneSelector onSelect={(tone) => {
            updateState({ skyTone: tone });
            // In a real app, logic would route back to tools or end session based on the tone.
            alert(`เซสชั่นเสร็จสมบูรณ์! ท้องฟ้าของคุณตอนนี้คือ: ${tone}`);
            window.location.href = "/";
          }} />
        </div>
      );
    }

    return (
      <div className="glass-panel p-10 text-center shadow-2xl relative w-full flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-800">เวทมนตร์ได้ผล!</h2>
        <p className="text-slate-600 mb-8 font-medium text-lg leading-relaxed max-w-md">
          ดูสิ! {visitorName} ดูสงบลงและตัวเล็กลงแล้วนะ ท้องฟ้าของเธอเริ่มมีพื้นที่ว่างมากขึ้น
        </p>
        
        {/* Calm Character animation */}
        <motion.div 
          className="w-24 h-24 bg-blue-200 rounded-full mb-10 shadow-sm relative flex items-center justify-center"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
           <div className="flex gap-2">
            <div className="w-3 h-1 bg-white rounded-full"></div>
            <div className="w-3 h-1 bg-white rounded-full"></div>
          </div>
        </motion.div>

        <button
          onClick={() => setShowFinalCheck(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg"
        >
          <RefreshCcw size={20} />
          <span>สำรวจท้องฟ้าอีกครั้ง</span>
        </button>
      </div>
    );
  }

  return null;
}
