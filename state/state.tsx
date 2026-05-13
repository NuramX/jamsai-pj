'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

export type SkyTone = 'sunny' | 'cloudy' | 'rainy' | 'stormy' | null
export type EmotionType = 'joy' | 'sadness' | 'anger' | 'fear' | 'surprise' | 'disgust' | 'anticipation' | 'trust' | null
export type UserRole = 'child' | 'teacher' | 'parent' | null

export interface CheckInData {
  skyTone: SkyTone
  situation: string
  thought: string
  sensation: string
  feeling: string
  behavior: string
  emotion: EmotionType
  intensity: number
  character: string
  regulationTool: string
  postSkyTone: SkyTone
  timestamp: Date
}

interface AppState {
  role: UserRole
  currentPage: number
  checkIn: Partial<CheckInData>
  allCheckIns: CheckInData[]
  setRole: (r: UserRole) => void
  setPage: (p: number) => void
  updateCheckIn: (data: Partial<CheckInData>) => void
  saveCheckIn: () => void
  resetCheckIn: () => void
}

const AppContext = createContext<AppState | null>(null)

const INITIAL_CHECK_INS: CheckInData[] = [
  // Sample historical data
  {
    skyTone: 'stormy', situation: 'เพื่อนแย่งของเล่น', thought: 'ไม่ยุติธรรมเลย!',
    sensation: 'ตัวร้อน', feeling: 'โกรธ', behavior: 'อยากตะโกน',
    emotion: 'anger', intensity: 75, character: 'Fizz', regulationTool: 'ลมหายใจมังกร',
    postSkyTone: 'cloudy', timestamp: new Date(Date.now() - 86400000 * 6)
  },
  {
    skyTone: 'rainy', situation: 'สอบได้คะแนนไม่ดี', thought: 'หนูไม่เก่งเลย',
    sensation: 'ตัวหนัก', feeling: 'เศร้า', behavior: 'อยากซ่อน',
    emotion: 'sadness', intensity: 60, character: 'Puddles', regulationTool: 'ยืดเหยียดรับแสงอาทิตย์',
    postSkyTone: 'cloudy', timestamp: new Date(Date.now() - 86400000 * 5)
  },
  {
    skyTone: 'sunny', situation: 'ได้รางวัลจากคุณครู', thought: 'หนูทำได้!',
    sensation: 'เบาสบาย', feeling: 'ดีใจ', behavior: 'อยากกระโดด',
    emotion: 'joy', intensity: 90, character: 'Ray', regulationTool: '',
    postSkyTone: 'sunny', timestamp: new Date(Date.now() - 86400000 * 4)
  },
  {
    skyTone: 'cloudy', situation: 'ไม่แน่ใจว่าจะเล่นกับใคร', thought: 'เพื่อนๆ ชอบหนูไหมนะ',
    sensation: 'มึนงง', feeling: 'กังวล', behavior: 'อยากอยู่คนเดียว',
    emotion: 'fear', intensity: 45, character: 'Misty', regulationTool: 'ภาพถ่ายแห่งความสุข',
    postSkyTone: 'sunny', timestamp: new Date(Date.now() - 86400000 * 2)
  },
  {
    skyTone: 'stormy', situation: 'น้องทำลายของที่วาดไว้', thought: 'เกลียดมาก!',
    sensation: 'ตัวสั่น', feeling: 'โมโห', behavior: 'อยากทุบอะไรสักอย่าง',
    emotion: 'anger', intensity: 85, character: 'Fizz', regulationTool: 'บีบมะนาว',
    postSkyTone: 'rainy', timestamp: new Date(Date.now() - 86400000 * 1)
  },
]

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>(null)
  const [currentPage, setPage] = useState(0)
  const [checkIn, setCheckIn] = useState<Partial<CheckInData>>({})
  const [allCheckIns, setAllCheckIns] = useState<CheckInData[]>(INITIAL_CHECK_INS)

  const updateCheckIn = (data: Partial<CheckInData>) => setCheckIn(prev => ({ ...prev, ...data }))
  const saveCheckIn = () => {
    if (checkIn.skyTone) {
      setAllCheckIns(prev => [...prev, { ...checkIn, timestamp: new Date() } as CheckInData])
      setCheckIn({})
    }
  }
  const resetCheckIn = () => { setCheckIn({}); setPage(0) }

  return (
    <AppContext.Provider value={{ role, currentPage, checkIn, allCheckIns, setRole, setPage, updateCheckIn, saveCheckIn, resetCheckIn }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

// Emotion config
export const EMOTIONS = {
  anger: { name: 'ความโกรธ', nameEn: 'Anger', color: '#FF4444', bg: 'rgba(255,68,68,0.15)', character: 'Fizz', emoji: '🔥', desc: 'คราจ', plutchikOpposite: 'fear', adjacent: 'disgust' },
  sadness: { name: 'ความเศร้า', nameEn: 'Sadness', color: '#4A90D9', bg: 'rgba(74,144,217,0.15)', character: 'Puddles', emoji: '💧', desc: 'หยดน้ำ', plutchikOpposite: 'joy', adjacent: 'fear' },
  joy: { name: 'ความสุข', nameEn: 'Joy', color: '#FFD166', bg: 'rgba(255,209,102,0.15)', character: 'Ray', emoji: '☀️', desc: 'แสง', plutchikOpposite: 'sadness', adjacent: 'trust' },
  fear: { name: 'ความกลัว', nameEn: 'Fear', color: '#2D6A4F', bg: 'rgba(45,106,79,0.15)', character: 'Misty', emoji: '🌫️', desc: 'หมอก', plutchikOpposite: 'anger', adjacent: 'sadness' },
  surprise: { name: 'ความประหลาดใจ', nameEn: 'Surprise', color: '#FF8C00', bg: 'rgba(255,140,0,0.15)', character: 'Zap', emoji: '⚡', desc: 'สายฟ้า', plutchikOpposite: 'anticipation', adjacent: 'joy' },
  disgust: { name: 'ความรังเกียจ', nameEn: 'Disgust', color: '#6B4226', bg: 'rgba(107,66,38,0.15)', character: 'Murk', emoji: '🌪️', desc: 'ลมวน', plutchikOpposite: 'trust', adjacent: 'anger' },
  anticipation: { name: 'ความคาดหวัง', nameEn: 'Anticipation', color: '#FF7043', bg: 'rgba(255,112,67,0.15)', character: 'Spark', emoji: '🌅', desc: 'พระอาทิตย์ขึ้น', plutchikOpposite: 'surprise', adjacent: 'joy' },
  trust: { name: 'ความไว้วางใจ', nameEn: 'Trust', color: '#00BFA5', bg: 'rgba(0,191,165,0.15)', character: 'Glow', emoji: '🌈', desc: 'รุ้ง', plutchikOpposite: 'disgust', adjacent: 'joy' },
}

export const SKY_TONES = {
  sunny: { label: 'แจ่มใส', labelEn: 'Sunny', emoji: '☀️', desc: 'ฉันรู้สึกดี/ตื่นเต้น', color: '#FFD166', bg: 'sky-sunny', textColor: '#7A4500' },
  cloudy: { label: 'มีเมฆ', labelEn: 'Cloudy', emoji: '☁️', desc: 'ฉันรู้สึกพอได้/ไม่แน่ใจ', color: '#90A4AE', bg: 'sky-cloudy', textColor: '#37474F' },
  rainy: { label: 'ฝนตก', labelEn: 'Rainy', emoji: '🌧️', desc: 'ฉันรู้สึกเศร้า/เชื่องช้า', color: '#4A90D9', bg: 'sky-rainy', textColor: '#1A3A5C' },
  stormy: { label: 'พายุ', labelEn: 'Stormy', emoji: '⛈️', desc: 'ฉันรู้สึกโกรธ/ท่วมท้น', color: '#4A5568', bg: 'sky-stormy', textColor: 'white' },
}

export const REGULATION_TOOLS = {
  anger: [
    { id: 'dragon', name: 'ลมหายใจมังกร', emoji: '🌬️', desc: 'หายใจออกอย่างช้าๆ เพื่อระบายความร้อน', duration: '3 นาที' },
    { id: 'lemon', name: 'บีบมะนาว', emoji: '🍋', desc: 'กำมือแน่นแล้วผ่อน เพื่อระบายพลังงาน', duration: '2 นาที' },
    { id: 'wall', name: 'ดันกำแพง', emoji: '🧱', desc: 'ออกแรงกดกำแพงเพื่อปล่อยพลัง', duration: '2 นาที' },
  ],
  sadness: [
    { id: 'stretch', name: 'ยืดเหยียดรับแสง', emoji: '☀️', desc: 'ยืดแขนขึ้นสูงและรับแสงอาทิตย์', duration: '3 นาที' },
    { id: 'memory', name: 'ภาพถ่ายแห่งความสุข', emoji: '📸', desc: 'นึกถึงความทรงจำดีๆ ที่ชอบ', duration: '5 นาที' },
    { id: 'hug', name: 'กอดตัวเอง', emoji: '🧸', desc: 'โอบกอดตัวเองอย่างอบอุ่น', duration: '2 นาที' },
  ],
  fear: [
    { id: 'safe', name: 'มองหาที่ปลอดภัย', emoji: '🏠', desc: 'มองรอบๆ และหาสิ่งที่ทำให้รู้สึกปลอดภัย', duration: '3 นาที' },
    { id: 'breath', name: 'หายใจ 4-7-8', emoji: '🌊', desc: 'หายใจเข้า 4 วิ กลั้น 7 วิ หายใจออก 8 วิ', duration: '4 นาที' },
    { id: 'ground', name: 'จับต้องโลก 5-4-3-2-1', emoji: '🌿', desc: 'หา 5 สิ่งที่มองเห็น 4 สัมผัส 3 ได้ยิน...', duration: '5 นาที' },
  ],
  joy: [
    { id: 'dance', name: 'เต้นอย่างอิสระ', emoji: '💃', desc: 'เต้นตามเพลงที่ชอบอย่างสนุกสนาน', duration: '3 นาที' },
    { id: 'share', name: 'แบ่งปันความสุข', emoji: '💌', desc: 'บอกเพื่อนหรือครอบครัวว่าวันนี้รู้สึกดีอย่างไร', duration: '5 นาที' },
    { id: 'draw', name: 'วาดภาพความสุข', emoji: '🎨', desc: 'วาดสิ่งที่ทำให้มีความสุขวันนี้', duration: '10 นาที' },
  ],
}