import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['zh-CN', 'zh-TW', 'en', 'ja', 'ko', 'es'],
  defaultLocale: 'zh-CN',
  localePrefix: 'always',
})

export type Locale = (typeof routing.locales)[number]
