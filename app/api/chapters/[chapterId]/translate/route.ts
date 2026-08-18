import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { tasks } from '@trigger.dev/sdk/v3'
import type { translateChapters } from '@/src/trigger/translateChapters'

const ALL_LOCALES = new Set(['zh-CN', 'zh-TW', 'en', 'ja', 'ko', 'es'])

// Translates a single chapter into one or more target locales — independent
// of the novel-level title/description translation triggered from the edit page.
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

  const triggered: string[] = []
  const conflicts: string[] = []

  for (const targetLocale of locales.filter((l) => l !== sourceLocale && novelTranslatedLocales.has(l))) {
    const existingReq = await prisma.translationRequest.findUnique({
      where: { novelId_targetLocale: { novelId, targetLocale } },
    })
    if (existingReq?.triggerRunId && (existingReq.status === 'pending' || existingReq.status === 'processing')) {
      conflicts.push(targetLocale)
      continue
    }

    const trReq = await prisma.translationRequest.upsert({
      where: { novelId_targetLocale: { novelId, targetLocale } },
      create: { novelId, targetLocale, status: 'pending' },
      update: { status: 'pending', triggerRunId: null, errorMessage: null },
    })

    try {
      const handle = await tasks.trigger<typeof translateChapters>('translate-chapters', {
        translationRequestId: trReq.id,
        novelId,
        sourceLocale,
        targetLocale,
        chapterIds: [chapter.id],
      })
      await prisma.translationRequest.update({
        where: { id: trReq.id },
        data: { triggerRunId: handle.id },
      })
      triggered.push(targetLocale)
    } catch {
      await prisma.translationRequest.update({
        where: { id: trReq.id },
        data: { status: 'failed', errorMessage: 'Failed to queue translation job' },
      })
    }
  }

  return NextResponse.json({ success: triggered.length > 0, triggered, conflicts })
}
