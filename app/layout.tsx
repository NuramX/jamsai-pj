import type { Metadata } from 'next'
import { Mitr } from 'next/font/google'
import './globals.css'

const mitr = Mitr({ 
  subsets: ['latin', 'thai'], 
  weight: ['200', '300', '400', '500', '600', '700'], 
  variable: '--font-mitr' 
})

export const metadata: Metadata = {
  title: 'แจ่มใส (Jamsai) — สะพานเชื่อมใจเด็ก คุณครู และครอบครัว',
  description: 'ระบบดูแลสุขภาพจิตเด็กแบบองค์รวม ผ่าน CBT และ Plutchik Model',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className={`${mitr.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}