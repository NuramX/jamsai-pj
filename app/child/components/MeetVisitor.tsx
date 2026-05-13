"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bookmark } from "lucide-react";
import type { AppState } from "../page";

interface Props {
  appState: AppState;
  onNext: () => void;
}

export default function MeetVisitor({ appState, onNext }: Props) {
  // Determine character based on Sky Tone for MVP
  const getVisitorInfo = () => {
    switch (appState.skyTone) {
      case "sunny":
        return { name: "Spark", color: "bg-amber-400", emotion: "ความตื่นเต้น", shadow: "shadow-amber-200" };
      case "cloudy":
        return { name: "Muffle", color: "bg-slate-400", emotion: "ความไม่แน่ใจ", shadow: "shadow-slate-200" };
      case "rainy":
        return { name: "Puddles", color: "bg-blue-400", emotion: "ความเศร้า", shadow: "shadow-blue-200" };
      case "stormy":
        return { name: "Fizz", color: "bg-indigo-600", emotion: "ความโกรธ/ล้นหลาม", shadow: "shadow-indigo-300" };
      default:
        return { name: "Blob", color: "bg-gray-400", emotion: "ความรู้สึก", shadow: "shadow-gray-200" };
    }
  };

  const visitor = getVisitorInfo();

  return (
    <div className="glass-panel p-8 text-center flex flex-col items-center shadow-2xl relative overflow-hidden">
      <h2 className="text-3xl font-bold mb-4 text-slate-800">พบกับผู้มาเยือน!</h2>
      
      <p className="text-slate-600 mb-8 font-medium text-lg leading-relaxed max-w-sm">
        ดูสิ! เธอรวบรวมชิ้นส่วนทั้งหมดแล้ว นั่นคือ <strong>{visitor.name}</strong> ก้อนเมฆแห่ง<strong>{visitor.emotion}</strong> 
        <br/><br/>
        {visitor.name} เป็นแค่ <em>ผู้มาเยือน</em> ในท้องฟ้าของเธอวันนี้เท่านั้นเองนะ!
      </p>

      {/* Visitor Character animation */}
      <motion.div 
        className={`w-40 h-40 ${visitor.color} rounded-full mb-10 shadow-[0_0_40px_rgba(0,0,0,0.2)] ${visitor.shadow} relative flex items-center justify-center`}
        animate={{ 
          scale: [1, 1.05, 1],
          borderRadius: ["50%", "45%", "55%", "50%"]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Simple cute face */}
        <div className="flex gap-4 mb-4">
          <div className="w-4 h-4 bg-white rounded-full"></div>
          <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>
        <div className="absolute w-6 h-2 bg-white/50 rounded-full bottom-12"></div>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        <button
          className="bg-white/80 hover:bg-white text-slate-700 font-bold py-4 px-6 rounded-full flex items-center justify-center gap-2 transition-all shadow-md flex-1 border-2 border-transparent hover:border-slate-200"
        >
          <Bookmark size={20} />
          <span>พักไว้ก่อน (Save State)</span>
        </button>

        <button
          onClick={onNext}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg flex-1"
        >
          <span>ดูแล {visitor.name} กันต่อ</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
