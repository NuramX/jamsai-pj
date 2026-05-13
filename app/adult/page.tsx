import Link from "next/link";
import { ArrowLeft, Users, Activity, AlertTriangle, MessageSquare } from "lucide-react";

export default function AdultDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-slate-600 transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-bold text-indigo-700">Antigravity AI Coordinator</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
              T
            </div>
            <span className="font-medium text-sm hidden md:inline">คุณครูใจดี (Teacher)</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-1">ภาพรวมของห้องเรียน (Classroom Overview)</h2>
            <p className="text-slate-500">วันจันทร์ที่ 24 กรกฎาคม</p>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm">
            ดูรายงานแบบละเอียด
          </button>
        </div>

        {/* Top metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "เช็คอินแล้ววันนี้", value: "28/30", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
            { label: "พัฒนาการคำศัพท์อารมณ์", value: "+15%", icon: Activity, color: "text-green-500", bg: "bg-green-50" },
            { label: "ธงแดงแจ้งเตือน (Red Flags)", value: "2", icon: AlertTriangle, color: "text-rose-500", bg: "bg-rose-50" },
            { label: "ผู้ปกครองตอบรับ", value: "85%", icon: MessageSquare, color: "text-purple-500", bg: "bg-purple-50" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <div className="text-slate-500 text-sm font-medium mb-1">{stat.label}</div>
                <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Triage Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          <div className="border-b border-slate-200 p-6 bg-slate-50/50">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <AlertTriangle className="text-rose-500" size={20} />
              The "Double Flag" Triage (ต้องการการดูแลด่วน)
            </h3>
          </div>
          <div className="p-6">
            <div className="border border-rose-200 bg-rose-50 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-rose-600 font-bold text-xl border border-rose-100 shadow-sm">
                  น
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">น้องต้นไม้ (ด.ช. ภูมิใจ)</h4>
                  <p className="text-sm text-slate-600">Rule of 3 (Stormy ต่อเนื่อง) + ผู้ปกครองยังไม่ได้อ่านรายงาน 2 สัปดาห์</p>
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button className="flex-1 md:flex-none bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  ดูประวัติ
                </button>
                <button className="flex-1 md:flex-none bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  ติดต่อผู้ปกครอง
                </button>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
