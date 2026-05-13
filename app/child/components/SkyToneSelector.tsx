"use client";

import { Sun, Cloud, CloudRain, CloudLightning } from "lucide-react";
import type { SkyTone } from "../page";

interface Props {
  onSelect: (tone: SkyTone) => void;
}

export default function SkyToneSelector({ onSelect }: Props) {
  const tones = [
    { id: "sunny", icon: Sun, label: "Sunny", desc: "รู้สึกดี / ตื่นเต้น", color: "text-amber-500", bg: "bg-orange-50 hover:bg-orange-100" },
    { id: "cloudy", icon: Cloud, label: "Cloudy", desc: "เฉยๆ / ไม่แน่ใจ", color: "text-slate-500", bg: "bg-slate-100 hover:bg-slate-200" },
    { id: "rainy", icon: CloudRain, label: "Rainy", desc: "เศร้า / ช้าลง", color: "text-blue-400", bg: "bg-blue-50 hover:bg-blue-100" },
    { id: "stormy", icon: CloudLightning, label: "Stormy", desc: "โกรธ / ล้นหลาม", color: "text-indigo-600", bg: "bg-indigo-50 hover:bg-indigo-100" },
  ] as const;

  return (
    <div className="glass-panel p-8 text-center flex flex-col items-center shadow-2xl">
      <h2 className="text-3xl font-bold mb-2 text-slate-800">ท้องฟ้าของเธอวันนี้เป็นยังไง?</h2>
      <p className="text-slate-500 mb-8 font-medium text-lg">เลือกสภาพอากาศที่ตรงกับใจเธอที่สุดนะ</p>

      <div className="grid grid-cols-2 gap-4 w-full">
        {tones.map(({ id, icon: Icon, label, desc, color, bg }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`flex flex-col items-center justify-center p-6 rounded-3xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg border-2 border-transparent hover:border-white ${bg}`}
          >
            <Icon size={64} className={`${color} mb-4 drop-shadow-sm`} />
            <span className={`text-xl font-bold ${color}`}>{label}</span>
            <span className="text-slate-600 font-medium text-sm mt-1">{desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
