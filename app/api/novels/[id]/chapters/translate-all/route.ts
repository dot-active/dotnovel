import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { tasks } from '@trigger.dev/sdk/v3'
import type { translateChapters } from '@/src/trigger/translateChapters'

const ALL_LOCALES = new Set(['zh-CN', 'zh-TW', 'en', 'ja', 'ko', 'es'])

// Translates every chapter of the novel that isn't already translated into
// one or more target locales — independent of the novel-level
// title/description translation. Chapters already translated for a given
// locale are left untouched; use the per-chapter translate button to force
// a retranslation.
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
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

  const novelId = params.id
  const novel = await prisma.novel.findFirst({ where: { id: novelId, authorId: userId } })
  if (!novel) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const chapters = await prisma.chapter.findMany({ where: { novelId }, select: { id: true } })
  if (chapters.length === 0) {
    return NextResponse.json({ error: 'This novel has no chapters yet' }, { status: 400 })
  }
  const chapterIds = chapters.map((c) => c.id)

  // Only allow locales the novel itself has already been translated into —
  // the language picker on the chapters page is scoped to these, but enforce
  // it server-side too rather than trusting the client's filtered list.
  const novelTranslatedLocales = new Set(
    (await prisma.novelTranslation.findMany({ where: { novelId }, select: { locale: true } })).map((t) => t.locale)
  )

  const triggered: string[] = []
  const conflicts: string[] = []
  const skipped: string[] = []

  for (const targetLocale of locales.filter((l) => l !== novel.sourceLocale && novelTranslatedLocales.has(l))) {
    const existingReq = await prisma.translationRequest.findUnique({
      where: { novelId_targetLocale: { novelId, targetLocale } },
    })
    if (existingReq?.triggerRunId && (existingReq.status === 'pending' || existingReq.status === 'processing')) {
      conflicts.push(targetLocale)
      continue
    }

    // Only translate chapters that don't already have a translation in this
    // locale — re-running "translate all" shouldn't clobber existing work.
    const alreadyTranslated = new Set(
      (
        await prisma.chapterTranslation.findMany({
          where: { chapterId: { in: chapterIds }, locale: targetLocale },
          select: { chapterId: true },
        })
      ).map((c) => c.chapterId)
    )
    const pendingChapterIds = chapterIds.filter((id) => !alreadyTranslated.has(id))
    if (pendingChapterIds.length === 0) {
      skipped.push(targetLocale)
      continue
    }

    const trReq = await prisma.translationRequest.upsert({
      where: { novelId_targetLocale: { novelId, targetLocale } },
      create: { novelId, targetLocale, status: 'pending', totalChapters: pendingChapterIds.length },
      update: { status: 'pending', triggerRunId: null, errorMessage: null, totalChapters: pendingChapterIds.length, doneChapters: 0 },
    })

    try {
      const handle = await tasks.trigger<typeof translateChapters>('translate-chapters', {
        translationRequestId: trReq.id,
        novelId,
        sourceLocale: novel.sourceLocale,
        targetLocale,
        chapterIds: pendingChapterIds,
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

  return NextResponse.json({ success: triggered.length > 0, triggered, conflicts, skipped })
}
