import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { runs } from '@trigger.dev/sdk/v3'

// Fully removes a target-locale translation: the novel title/description,
// every chapter translation in that locale, and the tracking request row.
// "Add translation" / "retranslate" are one-shot actions now, so there is no
// pausable in-progress state to resume — stopping just wipes the language.
export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { novelId, targetLocale } = await req.json()
  if (!novelId || !targetLocale) {
    return NextResponse.json({ error: 'Missing novelId or targetLocale' }, { status: 400 })
  }

  const novel = await prisma.novel.findFirst({ where: { id: novelId, authorId: userId } })
  if (!novel) return NextResponse.json({ error: 'Novel not found or not authorized' }, { status: 403 })

  const trReq = await prisma.translationRequest.findUnique({
    where: { novelId_targetLocale: { novelId, targetLocale } },
  })

  // Best-effort cancel of any in-flight job — a failure here shouldn't block cleanup.
  if (trReq?.triggerRunId && (trReq.status === 'pending' || trReq.status === 'processing')) {
    try {
      await runs.cancel(trReq.triggerRunId)
    } catch {
      // Trigger.dev API unreachable or run already finished — proceed with cleanup anyway
    }
  }

  const chapters = await prisma.chapter.findMany({ where: { novelId }, select: { id: true } })
  const chapterIds = chapters.map((c) => c.id)

  await prisma.$transaction([
    prisma.novelTranslation.deleteMany({ where: { novelId, locale: targetLocale } }),
    ...(chapterIds.length > 0
      ? [prisma.chapterTranslation.deleteMany({ where: { chapterId: { in: chapterIds }, locale: targetLocale } })]
      : []),
    prisma.translationRequest.deleteMany({ where: { novelId, targetLocale } }),
  ])

  return NextResponse.json({ success: true })
}
