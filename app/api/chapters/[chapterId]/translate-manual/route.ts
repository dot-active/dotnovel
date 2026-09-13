import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const ALL_LOCALES = new Set(['zh-CN', 'zh-TW', 'en', 'ja', 'ko', 'es'])

// Manual counterpart of ./translate: queues a single chapter for translation by
// marking the TranslationRequest as `translating` / `manual`, without handing
// anything to Trigger.dev. The local `npm run translate:manual` script picks
// these rows up and does the work.
export async function POST(req: NextRequest, { params }: { params: { chapterId: string } }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { targetLocales } = await req.json()
  if (!Array.isArray(targetLocales) || targetLocales.length === 0) {
    return NextResponse.json({ error: 'targetLocales is required' }, { status: 400 })
  }
  const locales = targetLocales.filter((l): l is string => typeof l === 'string' && ALL_LOCALES.has(l))
  if (locales.length === 0) {
    return NextResponse.json({ error: 'No valid target locales' }, { status: 400 })
  }

  const chapter = await prisma.chapter.findFirst({
    where: { id: params.chapterId },
    include: { novel: { select: { id: true, authorId: true, sourceLocale: true } } },
  })
  if (!chapter || chapter.novel.authorId !== userId) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const { id: novelId, sourceLocale } = chapter.novel

  // Only allow locales the novel itself has already been translated into —
  // the language picker on the chapters page is scoped to these, but enforce
  // it server-side too rather than trusting the client's filtered list.
  const novelTranslatedLocales = new Set(
    (await prisma.novelTranslation.findMany({ where: { novelId }, select: { locale: true } })).map((t) => t.locale)
  )

  const queued: string[] = []
  const conflicts: string[] = []

  for (const targetLocale of locales.filter((l) => l !== sourceLocale && novelTranslatedLocales.has(l))) {
    const existingReq = await prisma.translationRequest.findUnique({
      where: { novelId_targetLocale: { novelId, targetLocale } },
    })
    // There is only one request row per (novel, locale), so a job of *either*
    // kind still in flight blocks this one — overwriting the row would strand
    // a running Trigger.dev task or re-queue work the script is mid-way through.
    if (isInFlight(existingReq)) {
      conflicts.push(targetLocale)
      continue
    }

    await prisma.translationRequest.upsert({
      where: { novelId_targetLocale: { novelId, targetLocale } },
      create: {
        novelId,
        targetLocale,
        status: 'translating',
        source: 'manual',
        totalChapters: 1,
        chapterIds: [chapter.id],
      },
      update: {
        status: 'translating',
        source: 'manual',
        triggerRunId: null,
        errorMessage: null,
        totalChapters: 1,
        doneChapters: 0,
        chapterIds: [chapter.id],
      },
    })
    queued.push(targetLocale)
  }

  return NextResponse.json({ success: queued.length > 0, queued, conflicts })
}

function isInFlight(
  req: { status: string; source: string; triggerRunId: string | null } | null
): boolean {
  if (!req) return false
  // A Trigger.dev job counts only once it actually has a run id — a `pending`
  // row without one is a failed hand-off and is safe to take over.
  if (req.triggerRunId && (req.status === 'pending' || req.status === 'processing')) return true
  return req.source === 'manual' && (req.status === 'translating' || req.status === 'processing')
}
