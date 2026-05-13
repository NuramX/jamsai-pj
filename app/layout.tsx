import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '600', '700', '800'], variable: '--font-nunito' })

export const metadata: Metadata = {
  title: 'แจ่มใส (Jamsai) — สะพานเชื่อมใจเด็ก คุณครู และครอบครัว',
  description: 'ระบบดูแลสุขภาพจิตเด็กแบบองค์รวม ผ่าน CBT และ Plutchik Model',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className={`${nunito.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}