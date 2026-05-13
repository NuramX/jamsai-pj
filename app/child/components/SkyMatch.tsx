"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { AppState } from "../page";

interface Props {
  appState: AppState;
  onNext: () => void;
}

export default function SkyMatch({ appState, onNext }: Props) {
  const [matched, setMatched] = useState<string[]>([]);

  const variables = [
    { id: "thought", label: "ความคิด", value: appState.thought },
    { id: "sensation", label: "ความรู้สึกในกาย", value: appState.sensation },
    { id: "feeling", label: "อารมณ์", value: appState.feeling },
    { id: "behavior", label: "การกระทำ", value: appState.behavior },
  ];

  const handleMatch = (id: string) => {
    if (!matched.includes(id)) {
      setMatched([...matched, id]);
    }
  };

  const isComplete = matched.length === 4;

  return (
    <div className="glass-panel p-8 w-full shadow-2xl relative">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3 text-slate-800">เกมจับคู่ท้องฟ้า</h2>
        <p className="text-slate-600 font-medium text-lg">
          รวบรวมชิ้นส่วนทั้งหมดที่เธอเล่ามา ใส่ลงในกล่องเวทมนตร์เพื่อสร้างตัวละครของเธอกันเถอะ!
          (คลิกที่ชิ้นส่วนเพื่อใส่ลงกล่อง)
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-3">
          {variables.map((item) => {
            const isMatched = matched.includes(item.id);
            return (
              <motion.button
                key={item.id}
                onClick={() => handleMatch(item.id)}
                disabled={isMatched}
                whileHover={!isMatched ? { scale: 1.02 } : {}}
                whileTap={!isMatched ? { scale: 0.98 } : {}}
                className={`p-4 rounded-2xl text-left border-2 transition-all ${
                  isMatched 
                    ? "bg-slate-100 border-slate-200 text-slate-400 cursor-default opacity-50" 
                    : "bg-white border-blue-200 text-slate-700 hover:border-blue-400 shadow-sm"
                }`}
              >
                <div className="text-xs font-bold uppercase tracking-wider mb-1 text-blue-500">{item.label}</div>
                <div className="font-medium text-lg truncate">"{item.value}"</div>
              </motion.button>
            );
          })}
        </div>

        <div className="flex-1 bg-white/50 border-4 border-dashed border-blue-300 rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
          <AnimatePresence>
            {!isComplete && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center absolute">
                <div className="text-6xl mb-4">📦</div>
                <div className="text-xl font-bold text-slate-700">กล่องเวทมนตร์</div>
                <div className="text-blue-500 font-bold mt-2">{matched.length} / 4 ชิ้น</div>
              </motion.div>
            )}
            {isComplete && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center absolute z-10 flex flex-col items-center">
                <CheckCircle2 size={80} className="text-green-500 mb-4" />
                <div className="text-2xl font-bold text-green-600">รวบรวมครบแล้ว!</div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Visual fill indicator */}
          <div 
            className="absolute bottom-0 left-0 w-full bg-blue-100/50 transition-all duration-500 z-0"
            style={{ height: `${(matched.length / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={onNext}
          disabled={!isComplete}
          className={`flex items-center gap-2 font-bold py-4 px-8 rounded-full transition-all text-lg
            ${isComplete 
              ? "bg-green-500 hover:bg-green-600 text-white shadow-lg transform hover:scale-105" 
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
        >
          <span>ดูสิว่าชิ้นส่วนเหล่านี้สร้างอะไร!</span>
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}
