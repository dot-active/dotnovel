import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { BLOCKED_BOTS } from '@/lib/blockedBots'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: [...BLOCKED_BOTS], disallow: '/' },
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin',
          '/*/admin',
          '/*/author',
          '/*/onboarding',
          '/*/profile',
          '/*/comments',
          '/*/favorites',
          '/sign-in',
          '/sign-up',
          '/*/sign-in',
          '/*/sign-up',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
