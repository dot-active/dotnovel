import type { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { routing } from '@/i18n/routing'
import { SITE_URL } from '@/lib/site'

// Chapter-level pages are discoverable via crawlable links from novel detail
// pages; the catalog can reach tens of thousands of chapters, which would
// make a single sitemap slow to generate and risk the 50k-URL/sitemap cap.
// Listing novel + locale entries keeps this fast while covering every
// indexable work.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const novels = await prisma.novel.findMany({
    where: { publishStatus: 'published' },
    select: {
      id: true,
      updatedAt: true,
      translations: { where: { status: 'published' }, select: { locale: true } },
    },
  })

  const entries: MetadataRoute.Sitemap = []

  for (const locale of routing.locales) {
    entries.push({ url: `${SITE_URL}/${locale}`, changeFrequency: 'daily', priority: 1 })
    entries.push({ url: `${SITE_URL}/${locale}/novels`, changeFrequency: 'daily', priority: 0.8 })
  }

  const localeSet = new Set<string>(routing.locales)
  for (const novel of novels) {
    for (const tr of novel.translations) {
      if (!localeSet.has(tr.locale)) continue
      entries.push({
        url: `${SITE_URL}/${tr.locale}/novels/${novel.id}`,
        lastModified: novel.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    }
  }

  return entries
}
