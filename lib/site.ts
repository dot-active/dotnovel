import { routing } from '@/i18n/routing'

// Canonical site origin, no trailing slash. Used for metadataBase, sitemap,
// robots.txt, canonical URLs, and OG/Twitter absolute URLs.
export const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000').replace(/\/$/, '')

// Builds a canonical URL + per-locale hreflang alternates for a page that
// exists at the same path under every locale prefix.
export function buildAlternates(locale: string, pathAfterLocale: string) {
  const suffix = pathAfterLocale ? `/${pathAfterLocale}` : ''
  const languages: Record<string, string> = {}
  for (const l of routing.locales) {
    languages[l] = `${SITE_URL}/${l}${suffix}`
  }
  languages['x-default'] = `${SITE_URL}/${routing.defaultLocale}${suffix}`
  return {
    canonical: `${SITE_URL}/${locale}${suffix}`,
    languages,
  }
}
