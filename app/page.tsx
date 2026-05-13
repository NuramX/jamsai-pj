"use client";

import { useState } from "react";
import { Settings, Mic, Brush, ArrowRight, Cloud, CloudRain, CloudLightning, Sun, Wind, Frown, GripVertical, CloudDrizzle } from "lucide-react";
import { motion } from "framer-motion";

export default function App() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
      <div className="w-full max-w-[400px] h-[850px] max-h-screen bg-[#f8f9fb] shadow-2xl overflow-hidden relative flex flex-col sm:rounded-[2.5rem] border-8 border-white">
        
        {/* Render the current step */}
        <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
          {step === 1 && <Step1 onNext={() => setStep(2)} />}
          {step === 2 && <Step2 onNext={() => setStep(7)} onBack={() => setStep(1)} />}
          {step === 7 && <Step7 onNext={() => setStep(1)} />}
        </div>

        {/* Bottom Navigation (for Step 1 and 7) */}
        {(step === 1 || step === 7) && (
          <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 flex justify-around items-center px-2 py-3 pb-6">
            <button className="flex flex-col items-center gap-1 min-w-[72px]">
              <div className={`px-4 py-1.5 rounded-full ${step === 1 ? 'bg-[#93c5fd]' : 'bg-transparent'}`}>
                <Cloud size={24} className={step === 1 ? 'text-[#0369a1]' : 'text-gray-500'} />
              </div>
              <span className={`text-[11px] font-bold ${step === 1 ? 'text-[#0369a1]' : 'text-gray-500'}`}>Sky</span>
            </button>
            <button className="flex flex-col items-center gap-1 min-w-[72px]">
              <div className="px-4 py-1.5 rounded-full bg-transparent">
                <Brush size={24} className="text-gray-500" />
              </div>
              <span className="text-[11px] font-bold text-gray-500">Journal</span>
            </button>
            <button className="flex flex-col items-center gap-1 min-w-[72px]">
              <div className={`px-4 py-1.5 rounded-full ${step === 7 ? 'bg-[#93c5fd]' : 'bg-transparent'}`}>
                <CloudLightning size={24} className={step === 7 ? 'text-[#0369a1]' : 'text-gray-500'} />
              </div>
              <span className={`text-[11px] font-bold ${step === 7 ? 'text-[#0369a1]' : 'text-gray-500'}`}>Visitors</span>
            </button>
            <button className="flex flex-col items-center gap-1 min-w-[72px]">
              <div className="px-4 py-1.5 rounded-full bg-transparent">
                <div className="flex items-end gap-0.5 h-6">
                  <div className="w-1.5 h-3 bg-gray-500 rounded-full"></div>
                  <div className="w-1.5 h-4 bg-gray-500 rounded-full"></div>
                  <div className="w-1.5 h-5 bg-gray-500 rounded-full"></div>
                </div>
              </div>
              <span className="text-[11px] font-bold text-gray-500">Progress</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

function Header({ showProgress = false, step = 1, totalSteps = 12 }) {
  return (
    <div className="px-6 pt-10 pb-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center overflow-hidden border-2 border-teal-700">
            {/* Simple Fox avatar representation */}
            <div className="text-xl">🦊</div>
          </div>
          <h1 className="text-xl font-extrabold text-[#0369a1] tracking-tight">Sky Scout</h1>
        </div>
        <button className="text-[#0369a1]">
          <Settings size={24} />
        </button>
      </div>

      {showProgress && (
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-gray-600">Step {step} of {totalSteps}</span>
          <div className="flex gap-1.5 flex-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full ${i === 0 ? 'bg-[#0369a1] w-8' : 'bg-gray-200 flex-1'}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ================= STEP 1: SKY TONE =================
function Step1({ onNext }: { onNext: () => void }) {
  const tones = [
    { id: 'sunny', icon: '☀️', label: 'Sunny', desc: 'I feel good or excited' },
    { id: 'cloudy', icon: '☁️', label: 'Cloudy', desc: 'I feel okay or unsure' },
    { id: 'rainy', icon: '🌧️', label: 'Rainy', desc: 'I feel sad or slow' },
    { id: 'stormy', icon: '⛈️', label: 'Stormy', desc: 'I feel angry or overwhelmed' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col h-full">
      <Header showProgress step={1} />
      
      <div className="px-6 mt-4 pb-8">
        <h2 className="text-[2.5rem] leading-[1.1] font-extrabold text-[#1e293b] mb-8">
          How is your Sky today, Scout?
        </h2>

        <div className="flex flex-col gap-4">
          {tones.map((tone) => (
            <button 
              key={tone.id}
              onClick={onNext}
              className="bg-white hover:bg-gray-50 rounded-[2rem] p-6 flex flex-col items-center text-center shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-white transition-transform transform hover:scale-[1.02]"
            >
              <div className="text-5xl mb-3">{tone.icon}</div>
              <h3 className="text-xl font-bold text-[#1e293b] mb-1">{tone.label}</h3>
              <p className="text-sm font-medium text-gray-600">{tone.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ================= STEP 2: SITUATION =================
function Step2({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
  const [text, setText] = useState("");

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full bg-[#f8f9fb]">
      <div className="pt-16 px-6 pb-6 text-center">
        <div className="text-[#0369a1] text-xs font-bold tracking-widest uppercase mb-3">
          Gate 1: Situation
        </div>
        
        <div className="flex justify-center gap-1.5 mb-3">
          <div className="w-8 h-1.5 bg-[#93c5fd] rounded-full"></div>
          <div className="w-8 h-1.5 bg-[#0369a1] rounded-full"></div>
          <div className="w-8 h-1.5 bg-gray-200 rounded-full"></div>
          <div className="w-8 h-1.5 bg-gray-200 rounded-full"></div>
          <div className="w-8 h-1.5 bg-gray-200 rounded-full"></div>
        </div>
        
        <div className="text-sm font-medium text-gray-500 mb-8">
          Page 2 of 12
        </div>

        <h2 className="text-3xl leading-tight font-extrabold text-[#1e293b] mb-8">
          What happened to bring this weather to your sky?
        </h2>

        <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.05)] min-h-[350px] flex flex-col relative text-left">
          <textarea 
            className="w-full flex-1 bg-transparent border-none outline-none resize-none text-lg text-[#1e293b] placeholder-gray-400"
            placeholder="Start typing or draw here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          
          <div className="absolute bottom-6 left-6 right-6 flex gap-3 pt-6 border-t border-gray-100">
            <button className="w-12 h-12 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-[#0369a1]">
              <Mic size={20} />
            </button>
            <button className="w-12 h-12 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-[#0369a1]">
              <Brush size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full bg-[#f8f9fb] border-t border-gray-200 px-6 py-6 flex justify-between items-center">
        <button onClick={onBack} className="text-[#0369a1] font-bold px-4 py-2">
          Back
        </button>
        <button 
          onClick={onNext}
          disabled={!text}
          className={`px-8 py-3.5 rounded-full font-bold flex items-center gap-2 transition-colors ${text ? 'bg-[#e2e8f0] hover:bg-gray-300 text-[#1e293b]' : 'bg-[#e2e8f0] text-gray-500'}`}
        >
          <span>Next</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
}

// ================= STEP 7: SKY MATCH =================
function Step7({ onNext }: { onNext: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col h-full bg-[#f8f9fb]">
      <Header />
      
      <div className="px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-[#e0f2fe] px-4 py-1.5 rounded-full mb-4">
          <CloudDrizzle size={14} className="text-[#0369a1]" />
          <span className="text-xs font-bold text-[#0369a1]">Page 7 of 12</span>
        </div>

        <h2 className="text-4xl font-extrabold text-[#0369a1] mb-2">Sky Match</h2>
        <p className="text-gray-600 font-medium mb-8">Drag your pieces into the right bucket!</p>

        {/* Your Pieces */}
        <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.05)] mb-8 text-left">
          <h3 className="text-lg font-bold text-[#0369a1] flex items-center gap-2 mb-4">
            <span className="text-xl">🧩</span> Your Pieces
          </h3>

          <div className="flex flex-col gap-3">
            <Piece icon="🧠" type="THOUGHT" text='"It&apos;s not fair!"' bgColor="bg-amber-100" iconColor="text-amber-700" />
            <Piece icon="🔥" type="SENSATION" text="Hot face, tight chest" bgColor="bg-red-100" iconColor="text-red-700" />
            <Piece icon="⚡" type="BEHAVIOR" text="Clenched fists" bgColor="bg-stone-200" iconColor="text-stone-700" />
          </div>
        </div>

        {/* Buckets */}
        <div className="flex flex-col gap-4 pb-8">
          <Bucket icon="🌋" title="Anger" label="Match" bg="bg-[#ffe4e6]" border="border-[#fecdd3]" />
          <Bucket icon="💨" title="Fear" label="Not Quite" bg="bg-[#dcfce7]" border="border-[#bbf7d0]" />
          <Bucket icon="☹️" title="Annoyance" label="Similar" bg="bg-[#ffe4e6]" border="border-[#fecdd3]" />
        </div>
      </div>
    </motion.div>
  );
}

function Piece({ icon, type, text, bgColor, iconColor }) {
  return (
    <div className="border border-gray-100 rounded-2xl p-4 flex items-center gap-4 bg-white shadow-sm">
      <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center text-lg`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-[10px] font-bold text-gray-800 tracking-wider mb-0.5">{type}</div>
        <div className="text-sm font-bold text-[#1e293b]">{text}</div>
      </div>
      <GripVertical size={20} className="text-gray-300" />
    </div>
  );
}

function Bucket({ icon, title, label, bg, border }) {
  return (
    <div className={`rounded-[2rem] p-6 border-2 border-dashed ${border} ${bg} flex flex-col items-center justify-center py-10 relative overflow-hidden`}>
      <div className="w-16 h-16 rounded-full bg-white/50 flex items-center justify-center text-3xl mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[#1e293b] mb-2">{title}</h3>
      <div className="bg-white/60 px-3 py-1 rounded-full text-[10px] font-bold text-gray-700 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
