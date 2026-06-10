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
  title: 'NovelPhere · Read & Publish Novels in Any Language, Powered by AI',
  description: 'Write once, be read everywhere. dotnovel uses AI to instantly translate novels into 6+ languages, connecting writers with readers worldwide.',
  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: { url: '/favicons/apple-touch-icon.png' },
    other: [
      { url: '/favicons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/favicons/site.webmanifest',
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
