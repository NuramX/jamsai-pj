"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SkyToneSelector from "./components/SkyToneSelector";
import WeatherReport from "./components/WeatherReport";
import SkyMatch from "./components/SkyMatch";
import MeetVisitor from "./components/MeetVisitor";
import SelfRegulation from "./components/SelfRegulation";

export type SkyTone = "sunny" | "cloudy" | "rainy" | "stormy" | null;

export interface AppState {
  step: number;
  skyTone: SkyTone;
  situation: string;
  thought: string;
  sensation: string;
  feeling: string;
  behavior: string;
}

export default function ChildApp() {
  const [state, setState] = useState<AppState>({
    step: 1,
    skyTone: null,
    situation: "",
    thought: "",
    sensation: "",
    feeling: "",
    behavior: "",
  });

  const nextStep = () => setState((prev) => ({ ...prev, step: prev.step + 1 }));
  const updateState = (updates: Partial<AppState>) => setState((prev) => ({ ...prev, ...updates }));

  // Determine background based on Sky Tone
  const getBgClass = () => {
    switch (state.skyTone) {
      case "sunny": return "bg-[#FFE5B4]"; // bg-sky-sunny-bg
      case "cloudy": return "bg-[#E0E5EC]"; // bg-sky-cloudy-bg
      case "rainy": return "bg-[#C1D3FE]"; // bg-sky-rainy-bg
      case "stormy": return "bg-[#3F37C9]"; // bg-sky-stormy-bg
      default: return "bg-slate-50";
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ease-in-out ${getBgClass()} flex flex-col`}>
      <header className="p-4 flex justify-between items-center z-10">
        <h1 className="text-xl font-bold text-black/60 drop-shadow-sm">Sky Scout</h1>
        <div className="flex gap-1">
          {/* Progress dots */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i} 
              className={`h-2 w-2 rounded-full transition-all duration-300 ${i + 1 === state.step ? 'bg-black/60 w-4' : 'bg-black/20'}`} 
            />
          ))}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {state.step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full max-w-xl">
              <SkyToneSelector onSelect={(tone) => { updateState({ skyTone: tone }); nextStep(); }} />
            </motion.div>
          )}

          {state.step >= 2 && state.step <= 6 && (
            <motion.div key={`step${state.step}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full max-w-xl">
              <WeatherReport step={state.step} appState={state} updateState={updateState} onNext={nextStep} />
            </motion.div>
          )}

          {state.step === 7 && (
            <motion.div key="step7" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="w-full max-w-2xl">
              <SkyMatch appState={state} onNext={nextStep} />
            </motion.div>
          )}

          {state.step === 8 && (
            <motion.div key="step8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-xl">
              <MeetVisitor appState={state} onNext={nextStep} />
            </motion.div>
          )}

          {state.step >= 9 && state.step <= 12 && (
            <motion.div key={`step${state.step}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-xl text-center">
              <SelfRegulation step={state.step} appState={state} updateState={updateState} onNext={nextStep} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
