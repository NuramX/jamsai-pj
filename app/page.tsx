"use client";

import { useState, useEffect } from "react";
import { Settings, Mic, Brush, ArrowRight, Cloud, CloudRain, CloudLightning, Sun, Wind, GripVertical, CloudDrizzle, Heart, CheckCircle, X } from "lucide-react";
import { motion, PanInfo } from "framer-motion";

export default function Home() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    situation: "",
    thought: "",
    sensation: "",
    behavior: ""
  });

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex flex-col font-sans relative">
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-24 w-full max-w-4xl mx-auto flex flex-col scrollbar-hide">
        {step === 1 && <Step1 onNext={() => setStep(2)} />}
        {step === 2 && <GateStep gateNumber={1} gateTitle="สถานการณ์" pageNumber={2} question="เหตุการณ์อะไรทำให้สภาพอากาศในฟ้าของคุณเป็นแบบนี้?" value={answers.situation} onChange={(v) => setAnswers({...answers, situation: v})} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
        {step === 3 && <GateStep gateNumber={2} gateTitle="ความคิด" pageNumber={3} question="หัวของคุณกำลังกระซิบอะไรอยู่ข้างใน?" value={answers.thought} onChange={(v) => setAnswers({...answers, thought: v})} onNext={() => setStep(4)} onBack={() => setStep(2)} />}
        {step === 4 && <GateStep gateNumber={3} gateTitle="ความรู้สึก" pageNumber={4} question="ตรวจสอบสภาพอากาศของร่างกายคุณ: ร่างกายของคุณรู้สึกอย่างไร?" value={answers.sensation} onChange={(v) => setAnswers({...answers, sensation: v})} onNext={() => setStep(5)} onBack={() => setStep(3)} />}
        {step === 5 && <GateStep gateNumber={4} gateTitle="พฤติกรรม" pageNumber={5} question="ความรู้สึกนั้นทำให้ร่างกายของคุณอยากทำอะไร?" value={answers.behavior} onChange={(v) => setAnswers({...answers, behavior: v})} onNext={() => setStep(6)} onBack={() => setStep(4)} />}
        {step === 6 && <SkyMatch answers={answers} onNext={() => setStep(7)} />}
        {step === 7 && <MeetVisitor onNext={() => setStep(8)} />}
        {step === 8 && <SuggestionMenu onNext={() => setStep(9)} />}
        {step === 9 && <GuidedInteraction onNext={() => setStep(10)} />}
        {step === 10 && <FinalCheckIn onNext={() => setStep(1)} />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 z-[100]">
        <div className="max-w-md mx-auto flex justify-around items-center px-4 py-3 pb-safe">
          <button className="flex flex-col items-center gap-1 min-w-[72px]">
              <div className={`px-4 py-1.5 rounded-full transition-colors ${step === 1 ? 'bg-[#93c5fd]' : 'bg-transparent hover:bg-gray-100'}`}>
                <Cloud size={24} className={step === 1 ? 'text-[#0369a1]' : 'text-gray-500'} />
              </div>
              <span className={`text-[11px] font-bold ${step === 1 ? 'text-[#0369a1]' : 'text-gray-500'}`}>ฟ้า</span>
            </button>
            <button className="flex flex-col items-center gap-1 min-w-[72px]">
              <div className="px-4 py-1.5 rounded-full bg-transparent hover:bg-gray-100 transition-colors">
                <Brush size={24} className="text-gray-500" />
              </div>
              <span className="text-[11px] font-bold text-gray-500">บันทึก</span>
            </button>
            <button className="flex flex-col items-center gap-1 min-w-[72px]">
              <div className={`px-4 py-1.5 rounded-full transition-colors ${step === 7 ? 'bg-[#93c5fd]' : 'bg-transparent hover:bg-gray-100'}`}>
                <CloudLightning size={24} className={step === 7 ? 'text-[#0369a1]' : 'text-gray-500'} />
              </div>
              <span className={`text-[11px] font-bold ${step === 7 ? 'text-[#0369a1]' : 'text-gray-500'}`}>ผู้มาเยือน</span>
            </button>
            <button className="flex flex-col items-center gap-1 min-w-[72px]">
              <div className="px-4 py-1.5 rounded-full bg-transparent hover:bg-gray-100 transition-colors">
                <div className="flex items-end gap-0.5 h-6">
                  <div className="w-1.5 h-3 bg-gray-500 rounded-full"></div>
                  <div className="w-1.5 h-4 bg-gray-500 rounded-full"></div>
                  <div className="w-1.5 h-5 bg-gray-500 rounded-full"></div>
                </div>
              </div>
              <span className="text-[11px] font-bold text-gray-500">ความคืบหน้า</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Header({ showProgress = false, step = 1, totalSteps = 10 }) {
  return (
    <div className="px-6 pt-10 pb-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center overflow-hidden border-2 border-teal-700">
            {/* Simple Fox avatar representation */}
            <div className="text-xl">🦊</div>
          </div>
          <h1 className="text-xl font-extrabold text-[#0369a1] tracking-tight">แจ่มใส</h1>
        </div>
        <button className="text-[#0369a1]">
          <Settings size={24} />
        </button>
      </div>

      {showProgress && (
        <div className="flex flex-col items-center gap-3">
          <div className="flex justify-center gap-1.5 w-full max-w-[200px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <div 
                key={i} 
                className={`flex-1 h-2 rounded-full ${i < Math.ceil((step / totalSteps) * 5) ? 'bg-[#1e6091]' : 'bg-gray-200/60'}`}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-gray-500">หน้า {step} จาก {totalSteps}</span>
        </div>
      )}
    </div>
  );
}

// ================= STEP 1: SKY TONE =================
function Step1({ onNext }: { onNext: () => void }) {
  const tones = [
    { id: 'sunny', icon: '☀️', label: 'แจ่มใส', desc: 'ฉันรู้สึกดีหรือตื่นเต้น' },
    { id: 'cloudy', icon: '☁️', label: 'เมฆหนา', desc: 'ฉันรู้สึกโอเคหรือไม่ชัวร์' },
    { id: 'rainy', icon: '🌧️', label: 'ฝนตกชุก', desc: 'ฉันรู้สึกเศร้าหรือเฉื่อย' },
    { id: 'stormy', icon: '⛈️', label: 'มรสุม', desc: 'ฉันรู้สึกโกรธหรือท่วมท้น' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col h-full">
      <Header showProgress step={1} />
      
      <div className="px-6 mt-4 pb-8">
        <h2 className="text-[2.5rem] leading-[1.1] font-extrabold text-[#1e293b] mb-8">
          วันนี้ท้องฟ้าของคุณเป็นอย่างไร
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

// ================= GATE STEP (Reusable for Steps 2-5) =================
function GateStep({ 
  gateNumber, 
  gateTitle, 
  pageNumber, 
  question, 
  value,
  onChange,
  onNext, 
  onBack 
}: { 
  gateNumber: number, 
  gateTitle: string, 
  pageNumber: number, 
  question: string, 
  value: string,
  onChange: (v: string) => void,
  onNext: () => void, 
  onBack: () => void 
}) {

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full bg-[#f8f9fb]">
      <Header showProgress step={pageNumber} totalSteps={10} />
      
      <div className="px-6 pb-6 text-center">
        <div className="text-[#0369a1] text-xs font-bold tracking-widest uppercase mb-3 mt-4">
          ประตูที่ {gateNumber}: {gateTitle}
        </div>

        <h2 className="text-3xl leading-tight font-extrabold text-[#1e293b] mb-8">
          {question}
        </h2>

        <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.05)] min-h-[350px] flex flex-col relative text-left">
          <textarea 
            className="w-full flex-1 bg-transparent border-none outline-none resize-none text-lg text-[#1e293b] placeholder-gray-400"
            placeholder="เริ่มพิมพ์หรือวาดที่นี่..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
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

      <div className="fixed bottom-[72px] left-0 w-full bg-[#f8f9fb]/95 backdrop-blur-md border-t border-gray-200 px-6 py-4 flex justify-between items-center z-50">
        <div className="w-full max-w-4xl mx-auto flex justify-between items-center">
          <button onClick={onBack} className="text-[#0369a1] font-bold px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors">ย้อนกลับ</button>
          <button 
            onClick={onNext}
            disabled={!value.trim()}
            className={`px-8 py-3.5 rounded-full font-bold flex items-center gap-2 transition-colors ${value.trim() ? 'bg-[#e2e8f0] hover:bg-gray-300 text-[#1e293b]' : 'bg-[#e2e8f0] text-gray-500'}`}
          >
            <span>ต่อไป</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ================= STEP 6: SKY MATCH =================
import { useRef } from "react";

const initialBucketsData = [
  { id: 'anger', title: 'Anger', icon: '🌋', bg: 'bg-[#ffe4e6]', border: 'border-[#fecdd3]', pieces: [] as string[] },
  { id: 'fear', title: 'Fear', icon: '💨', bg: 'bg-[#dcfce7]', border: 'border-[#bbf7d0]', pieces: [] as string[] },
  { id: 'annoyance', title: 'Annoyance', icon: '☹️', bg: 'bg-[#ffe4e6]', border: 'border-[#fecdd3]', pieces: [] as string[] },
];

function SkyMatch({ answers, onNext }: { answers: { situation: string, thought: string, sensation: string, behavior: string }, onNext: () => void }) {
  const dynamicPieces = [
    { id: 'p1', type: 'สถานการณ์ (SITUATION)', text: answers.situation || '...', icon: '🌤️', bgColor: 'bg-blue-100', iconColor: 'text-blue-700' },
    { id: 'p2', type: 'ความคิด (THOUGHT)', text: answers.thought || '...', icon: '🧠', bgColor: 'bg-amber-100', iconColor: 'text-amber-700' },
    { id: 'p3', type: 'รับสัมผัส (SENSATION)', text: answers.sensation || '...', icon: '🔥', bgColor: 'bg-red-100', iconColor: 'text-red-700' },
    { id: 'p4', type: 'พฤติกรรม (BEHAVIOR)', text: answers.behavior || '...', icon: '⚡', bgColor: 'bg-stone-200', iconColor: 'text-stone-700' },
  ];

  const [buckets, setBuckets] = useState(initialBucketsData);
  const [resultPhase, setResultPhase] = useState<'playing' | 'tie' | 'result'>('playing');
  const [finalEmotion, setFinalEmotion] = useState('');
  const [tiedEmotions, setTiedEmotions] = useState<typeof initialBucketsData>([]);
  const bucketRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, pieceId: string) => {
    // info.point is relative to the page document, not the viewport
    const { x, y } = info.point;
    
    for (const [bucketId, el] of Object.entries(bucketRefs.current)) {
      if (!el) continue;
      
      // getBoundingClientRect is relative to viewport, so we add window scroll
      const rect = el.getBoundingClientRect();
      const rectTop = rect.top + window.scrollY;
      const rectBottom = rect.bottom + window.scrollY;
      const rectLeft = rect.left + window.scrollX;
      const rectRight = rect.right + window.scrollX;
      
      // Check collision with a generous 20px padding to make dropping easier
      if (x >= rectLeft - 20 && x <= rectRight + 20 && y >= rectTop - 20 && y <= rectBottom + 20) {
        setBuckets(prev => prev.map(b => {
          if (b.id === bucketId && !b.pieces.includes(pieceId)) {
            return { ...b, pieces: [...b.pieces, pieceId] };
          }
          return b;
        }));
        break;
      }
    }
  };

  const handleFinish = () => {
    let maxCount = -1;
    let maxBuckets: typeof initialBucketsData = [];

    buckets.forEach(b => {
      const count = b.pieces.length;
      if (count > maxCount) {
        maxCount = count;
        maxBuckets = [b];
      } else if (count === maxCount) {
        maxBuckets.push(b);
      }
    });

    if (maxCount === 0) {
      alert("กรุณาลากอย่างน้อย 1 ชิ้นส่วนลงตะกร้าก่อนครับ!");
      return;
    }

    if (maxBuckets.length > 1) {
      setTiedEmotions(maxBuckets);
      setResultPhase('tie');
    } else {
      setFinalEmotion(maxBuckets[0].title);
      setResultPhase('result');
    }
  };

  if (resultPhase === 'tie') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center h-full bg-[#f8f9fb]">
        <h2 className="text-3xl font-extrabold text-[#0369a1] mb-4">สูสีกันมากเลย! 🤔</h2>
        <p className="text-lg text-gray-600 mb-8 px-4">
          ฟิซดูจะมีอารมณ์หลายอย่างปนกัน เธอคิดว่าอารมณ์ไหนตรงกับฟิซที่สุดตอนนี้?
        </p>
        <div className="flex flex-col gap-4 w-full max-w-sm">
          {tiedEmotions.map(b => (
            <button 
              key={b.id} 
              onClick={() => { setFinalEmotion(b.title); setResultPhase('result'); }} 
              className={`p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-all font-bold text-2xl flex items-center justify-center gap-4 border-2 border-dashed ${b.bg} ${b.border} text-[#1e293b]`}
            >
               <span className="text-4xl">{b.icon}</span> {b.title}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (resultPhase === 'result') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center h-full bg-[#f8f9fb]">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-7xl mb-6">🎉</motion.div>
        <h2 className="text-3xl font-extrabold text-[#0369a1] mb-2">สรุปผล!</h2>
        <p className="text-lg text-gray-600 mb-8">อารมณ์ที่เป็นผู้มาเยือนของเธอวันนี้คือ...</p>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="bg-white p-10 rounded-[3rem] shadow-[0_8px_30px_-15px_rgba(0,0,0,0.1)] border-4 border-[#fecdd3] mb-12 w-full max-w-sm">
           <h3 className="text-4xl font-black text-rose-600 uppercase tracking-wider">{finalEmotion}</h3>
        </motion.div>
        <button onClick={onNext} className="bg-[#1e6091] text-white px-8 py-4 rounded-full font-bold text-xl flex items-center gap-3 shadow-lg hover:bg-[#184e77] transition-colors">
           ไปทำความรู้จักผู้มาเยือนกันเลย <ArrowRight size={22} />
        </button>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col min-h-screen bg-[#f8f9fb]">
      <Header showProgress step={6} totalSteps={10} />
      
      <div className="px-6 text-center pb-24">
        <h2 className="text-4xl font-extrabold text-[#0369a1] mb-2">จับคู่ชิ้นส่วน</h2>
        <p className="text-gray-600 font-medium mb-8">ลากชิ้นส่วนของคุณลงไปในกล่องอารมณ์ที่ใช่!</p>

        {/* Your Pieces */}
        <div className="bg-white/80 backdrop-blur-sm rounded-[1.5rem] p-4 shadow-sm mb-6 text-left border border-white z-20 relative">
          <h3 className="text-base font-bold text-[#0369a1] flex items-center gap-2 mb-3">
            <span className="text-lg">🧩</span> ชิ้นส่วนของคุณ
          </h3>

          <div className="grid grid-cols-1 gap-2 relative">
            {dynamicPieces.map((p) => (
              <motion.div
                key={p.id}
                drag
                dragSnapToOrigin
                onDragEnd={(e, info) => handleDragEnd(e, info, p.id)}
                whileDrag={{ scale: 1.05, zIndex: 50, cursor: 'grabbing' }}
                className={`border border-gray-100 rounded-xl p-3 flex items-center gap-3 bg-white shadow-sm cursor-grab active:cursor-grabbing`}
              >
                <div className={`w-10 h-10 rounded-full ${p.bgColor} flex items-center justify-center text-lg flex-shrink-0`}>
                  {p.icon}
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-bold text-gray-800 tracking-wider mb-0.5">{p.type}</div>
                  <div className="text-sm font-bold text-[#1e293b] leading-tight">{p.text}</div>
                </div>
                <GripVertical size={18} className="text-gray-300 flex-shrink-0" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Buckets */}
        <div className="flex flex-col gap-3 pb-8 z-10 relative">
          {buckets.map(b => (
            <div 
              key={b.id}
              ref={el => { bucketRefs.current[b.id] = el }}
              className={`rounded-[1.5rem] p-4 border-2 border-dashed ${b.border} ${b.bg} flex items-center gap-4 relative overflow-hidden transition-all min-h-[90px]`}
            >
              <div className="w-14 h-14 rounded-full bg-white/50 flex items-center justify-center text-3xl flex-shrink-0">
                {b.icon}
              </div>
              <div className="flex flex-col flex-1 items-start">
                <h3 className="text-lg font-bold text-[#1e293b]">{b.title}</h3>
                
                {/* Show pieces inside bucket */}
                <div className="flex flex-wrap gap-1.5 mt-1 min-h-[32px] w-full bg-white/40 rounded-xl p-1.5 border border-white/50">
                  {b.pieces.length === 0 && (
                    <span className="text-[10px] text-gray-500 font-medium px-1 flex items-center">วางที่นี่...</span>
                  )}
                  {b.pieces.map(pid => {
                    const p = dynamicPieces.find(x => x.id === pid);
                    return (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} key={pid} className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-xs border border-gray-100">
                        {p?.icon}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Done Button */}
        <div className="flex justify-center mt-2 pb-8">
          <button 
            onClick={handleFinish}
            className="bg-[#1e6091] hover:bg-[#184e77] text-white px-8 py-3.5 rounded-full font-bold text-lg flex items-center gap-2 shadow-[0_8px_20px_-8px_rgba(30,96,145,0.6)] transition-all transform hover:scale-105"
          >
            <span>จับคู่เสร็จแล้ว!</span>
            <CheckCircle size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ================= STEP 7: MEET VISITOR =================
function MeetVisitor({ onNext }: { onNext: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col min-h-screen bg-[#f8f9fb] relative pb-32">
      
      {/* Header */}
      <Header showProgress step={7} totalSteps={10} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-6 z-10 w-full max-w-2xl mx-auto">
        
        {/* Character Illustration Placeholder */}
        <motion.div 
          className="w-64 h-64 rounded-full bg-gradient-to-tr from-rose-100 to-amber-50 border-4 border-white shadow-[0_10px_40px_-10px_rgba(225,29,72,0.2)] mb-8 flex flex-col items-center justify-center relative overflow-hidden"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Decorative background clouds/sun */}
          <Sun size={40} className="absolute top-8 right-8 text-amber-300 opacity-50" />
          <Cloud size={60} className="absolute bottom-10 left-4 text-blue-200 opacity-50" />
          
          {/* The Character */}
          <CloudLightning size={100} className="text-rose-500 drop-shadow-md mb-2" />
          <div className="flex gap-4 absolute top-1/2 -mt-4">
             <div className="w-2 h-2 bg-rose-900 rounded-full"></div>
             <div className="w-2 h-2 bg-rose-900 rounded-full"></div>
          </div>
          <div className="w-4 h-1 bg-rose-900 rounded-full mt-2"></div>
          
          <h2 className="absolute bottom-6 text-2xl font-black text-rose-800 tracking-wider font-mono">FIZZ</h2>
        </motion.div>

        {/* Text Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-[2rem] p-8 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.05)] text-center w-full max-w-xl mb-10">
          <p className="text-lg font-bold text-[#1e293b] mb-6 leading-relaxed">
            ดูสิ, นักสำรวจ! คุณเก็บชิ้นส่วนทั้งหมดแล้ว.
          </p>
          
          <h2 className="text-2xl font-extrabold text-[#1e293b] mb-6 leading-snug">
            นี่คือ <span className="text-rose-600">Fizz</span>, เมฆโกรธ.
          </h2>
          
          <p className="text-[#475569] font-medium leading-relaxed">
            Fizz เพียงผู้มาเยือนในฟ้าของคุณวันนี้!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-xl flex flex-col md:flex-row items-center gap-6 mt-auto">
          <button 
            onClick={onNext}
            className="w-full bg-[#1e6091] hover:bg-[#184e77] text-white py-4 px-8 rounded-full font-bold text-lg flex items-center justify-center gap-3 shadow-lg transition-colors"
          >
            <span>พร้อมช่วย Fizz แล้วหรือยัง?</span>
            <ArrowRight size={20} />
          </button>
          
          <button className="text-gray-600 font-bold text-sm hover:text-gray-800 transition-colors">
            บันทึกไว้ใช้ต่อ
          </button>
        </div>
        
      </div>
    </motion.div>
  );
}

// ================= STEP 8: SUGGESTION MENU =================
function SuggestionMenu({ onNext }: { onNext: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col min-h-screen bg-[#f8f9fb] pb-32">
      <Header showProgress step={8} totalSteps={10} />

      <div className="pt-12 px-6 flex flex-col items-center w-full max-w-4xl mx-auto">
        {/* Title Section */}
        <div className="bg-white/50 backdrop-blur-sm rounded-[2.5rem] p-8 w-full max-w-2xl mb-8 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] flex flex-col items-center text-center border border-white">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-rose-100 to-amber-50 flex items-center justify-center mb-6 shadow-sm border-2 border-white">
             <CloudLightning size={40} className="text-rose-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-[#1e293b] mb-4">มาช่วย Fizz กันเถอะ</h2>
          <p className="text-gray-600 font-medium text-sm leading-relaxed">
            ฟิซกำลังรู้สึกเปรี๊ยะๆ เพราะหอคอยเลโก้โดนพัง เราควรใช้เครื่องมือท้องฟ้าชิ้นไหนดีนะ?
          </p>
        </div>

        {/* Tools */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <button onClick={onNext} className="bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-50 flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-full bg-[#e0f2fe] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Wind size={28} className="text-[#0369a1]" />
            </div>
            <h3 className="text-[#0369a1] font-bold text-lg mb-1">ลมหายใจมังกร</h3>
            <p className="text-gray-500 text-sm font-medium">หายใจลึกๆ ช้าๆ เพื่อทำให้เย็นลง.</p>
          </button>
          
          <button className="bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-50 flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-full bg-[#ffedd5] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-3xl">
              🍋
            </div>
            <h3 className="text-[#9a3412] font-bold text-lg mb-1">บีบมะนาว</h3>
            <p className="text-gray-500 text-sm font-medium">ตึงและคลายกล้ามเนื้อของคุณ.</p>
          </button>

          <button className="bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-50 flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-full bg-[#fee2e2] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-3xl">
              🧱
            </div>
            <h3 className="text-[#7f1d1d] font-bold text-lg mb-1">ดันกำแพง</h3>
            <p className="text-gray-500 text-sm font-medium">ใช้ความหนักเพื่อให้รู้สึกมั่นคง.</p>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ================= STEP 9: GUIDED INTERACTION (DRAGON BREATH) =================
function GuidedInteraction({ onNext }: { onNext: () => void }) {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out' | 'done'>('in');
  const [cycle, setCycle] = useState(1);

  useEffect(() => {
    if (phase === 'done') return;

    let timeout: NodeJS.Timeout;

    if (phase === 'in') {
      timeout = setTimeout(() => setPhase('hold'), 4000); // Breathe in for 4s
    } else if (phase === 'hold') {
      timeout = setTimeout(() => setPhase('out'), 2000); // Hold for 2s
    } else if (phase === 'out') {
      timeout = setTimeout(() => {
        if (cycle >= 3) {
          setPhase('done');
        } else {
          setCycle(c => c + 1);
          setPhase('in');
        }
      }, 4000); // Breathe out for 4s
    }

    return () => clearTimeout(timeout);
  }, [phase, cycle]);

  const getPhaseText = () => {
    switch (phase) {
      case 'in': return 'หายใจเข้าลึกๆ...';
      case 'hold': return 'กลั้นไว้...';
      case 'out': return 'เป่าลมออกยาวๆ...';
      case 'done': return 'เก่งมาก!';
      default: return '...';
    }
  };

  const getScale = () => {
    if (phase === 'in' || phase === 'hold') return 1.5;
    return 1;
  };

  const getDuration = () => {
    if (phase === 'in') return 4;
    if (phase === 'hold') return 2;
    if (phase === 'out') return 4;
    return 1;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col min-h-screen bg-[#f8f9fb] relative overflow-hidden pb-32">
      
      {/* Header */}
      <Header showProgress step={9} totalSteps={10} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-4 z-10 w-full max-w-2xl mx-auto">
        <h2 className="text-4xl font-extrabold text-[#0369a1] mb-2 text-center">ลมหายใจมังกร</h2>
        <p className="text-[#334155] font-medium text-center text-md max-w-xs mb-8 leading-relaxed">
          หายใจลึกเข้า...และเป่าความร้อนออกเหมือนมังกร!
        </p>

        {/* Breathing Animation Container */}
        <div className="relative flex items-center justify-center mb-16 h-64">
          <motion.div 
            className="absolute w-48 h-48 rounded-full bg-[#bae6fd] opacity-50 blur-2xl"
            animate={{ scale: getScale() }}
            transition={{ duration: getDuration(), ease: "easeInOut" }}
          />
          <motion.div 
            className="w-40 h-40 rounded-full bg-gradient-to-br from-sky-100 to-sky-50 shadow-xl border-4 border-white flex items-center justify-center text-6xl z-10 relative overflow-hidden"
            animate={{ scale: getScale() }}
            transition={{ duration: getDuration(), ease: "easeInOut" }}
          >
            🐲
          </motion.div>
        </div>

        {/* Dynamic Breathing Text */}
        <div className="h-20 flex flex-col items-center justify-center mb-4">
          <motion.div 
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-2xl font-extrabold text-center ${phase === 'done' ? 'text-green-600' : 'text-[#0ea5e9]'}`}
          >
            {getPhaseText()}
          </motion.div>
          {phase !== 'done' && (
            <div className="text-sm font-bold text-gray-500 mt-2">
              รอบที่ {cycle} จาก 3
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="w-full max-w-md mt-auto">
          <button 
            onClick={onNext}
            className={`w-full py-4 px-8 rounded-full font-bold text-xl flex items-center justify-center gap-3 shadow-lg transition-all transform hover:scale-105 ${phase === 'done' ? 'bg-[#1e6091] hover:bg-[#184e77] text-white shadow-[0_10px_30px_-10px_rgba(30,96,145,0.5)]' : 'bg-white/80 text-[#0369a1] border-2 border-[#1e6091]'}`}
          >
            <span>ฉันรู้สึกเย็นลง</span>
            <Heart size={22} className={phase === 'done' ? 'stroke-[2.5]' : 'stroke-2 fill-transparent'} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ================= STEP 10: FINAL CHECK-IN =================
function FinalCheckIn({ onNext }: { onNext: () => void }) {
  const tones = [
    { id: 'sunny', icon: <Sun size={32} className="text-amber-500" />, label: 'แจ่มใส' },
    { id: 'cloudy', icon: <Cloud size={32} className="text-slate-500" />, label: 'มีเมฆ' },
    { id: 'rainy', icon: <CloudRain size={32} className="text-blue-500" />, label: 'ฝนตก' },
    { id: 'stormy', icon: <CloudLightning size={32} className="text-gray-800" />, label: 'พายุ' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col min-h-screen bg-[#f8f9fb] pb-32">
      <Header showProgress step={10} totalSteps={10} />
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center px-6">

        {/* Content Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] p-8 shadow-xl w-full flex flex-col items-center text-center mt-12">
          
          <div className="w-32 h-32 rounded-full bg-pink-100 shadow-inner border-4 border-white flex items-center justify-center text-6xl mb-6 relative -mt-16">
             😊
          </div>

          <h2 className="text-4xl font-extrabold text-[#0369a1] mb-4 leading-tight">
            สภาพท้องฟ้าของคุณ<br/>ตอนนี้เป็นอย่างไร?
          </h2>

          <p className="text-gray-600 font-medium mb-8 leading-relaxed px-2">
            ทุกก้อนเมฆล้วนได้รับการต้อนรับในท้องฟ้าของคุณ นักสำรวจ. คุณทำได้ดีมากที่ดูแลสภาพอากาศของตัวเองในวันนี้!
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-8">
            {tones.map((tone) => (
              <button 
                key={tone.id}
                className="bg-white hover:bg-gray-50 border border-gray-100 rounded-[1.5rem] p-6 shadow-sm flex flex-col items-center justify-center gap-3 transition-transform hover:scale-105"
              >
                {tone.icon}
                <span className="font-extrabold text-[#1e293b]">{tone.label}</span>
              </button>
            ))}
          </div>

          <button 
            onClick={onNext}
            className="w-full max-w-md bg-[#1e6091] hover:bg-[#184e77] text-white py-4 px-8 rounded-full font-bold text-xl flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <span>เสร็จสิ้น</span>
            <CheckCircle size={22} className="stroke-2" />
          </button>
        </div>
        
      </div>
    </motion.div>
  );
}
