import Link from "next/link";
import { CloudRain, Sun, Brain, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-sky-sunny-bg flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 text-white/50 animate-pulse">
        <Sun size={120} />
      </div>
      <div className="absolute bottom-20 right-10 text-sky-rainy-accent/30 animate-bounce" style={{ animationDuration: '4s' }}>
        <CloudRain size={100} />
      </div>
      <div className="absolute top-40 right-40 text-sky-sunny-accent/40 animate-pulse" style={{ animationDuration: '3s' }}>
        <Sparkles size={60} />
      </div>

      <main className="glass-panel max-w-2xl w-full p-8 md:p-12 text-center relative z-10 flex flex-col items-center">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-inner mb-6">
          <Brain size={48} className="text-sky-stormy-accent" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 drop-shadow-sm">
          แจ่มใส <span className="text-sky-sunny-accent">(Jamsai)</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-10 font-medium">
          สะพานเชื่อมใจเด็ก คุณครู และครอบครัว
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-lg">
          <Link 
            href="/child" 
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 p-1 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="bg-white/90 backdrop-blur-sm h-full w-full rounded-xl p-6 flex flex-col items-center justify-center gap-3 group-hover:bg-transparent group-hover:text-white transition-colors duration-300">
              <Sun size={40} className="text-amber-400 group-hover:text-white transition-colors" />
              <span className="text-xl font-bold text-slate-700 group-hover:text-white transition-colors">
                ฉันคือนักเรียน
                <br/>
                <span className="text-sm font-normal opacity-80">(Sky Scout)</span>
              </span>
            </div>
          </Link>

          <Link 
            href="/adult" 
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 p-1 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="bg-white/90 backdrop-blur-sm h-full w-full rounded-xl p-6 flex flex-col items-center justify-center gap-3 group-hover:bg-transparent group-hover:text-white transition-colors duration-300">
              <Brain size={40} className="text-indigo-500 group-hover:text-white transition-colors" />
              <span className="text-xl font-bold text-slate-700 group-hover:text-white transition-colors">
                ผู้ปกครอง / ครู
                <br/>
                <span className="text-sm font-normal opacity-80">(AI Coordinator)</span>
              </span>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
