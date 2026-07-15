import { ClerkProvider } from '@clerk/nextjs'
import { zhCN, zhTW, enUS, jaJP, koKR, esES } from '@clerk/localizations'
import type { LocalizationResource } from '@clerk/types'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

// locale 到 Clerk 本地化的映射
const clerkLocalizations: Record<string, LocalizationResource> = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  en: enUS,
  ja: jaJP,
  ko: koKR,
  es: esES,
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()
  const localization = clerkLocalizations[locale] ?? enUS

  return (
    <ClerkProvider localization={localization} afterSignUpUrl="/onboarding">
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </ClerkProvider>
  )
}
