import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export const metadata: Metadata = {
  title: 'DotNovel · 在线小说阅读',
  description: '海量正版小说，畅享阅读乐趣',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="zh-CN">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
