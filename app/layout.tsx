import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'DotNovel · 在线小说阅读',
  description: '海量正版小说，畅享阅读乐趣',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider afterSignUpUrl="/onboarding">
      <html lang="zh-CN" className={cormorant.variable}>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
