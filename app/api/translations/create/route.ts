import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { tasks } from '@trigger.dev/sdk/v3'
import type { translateNovel } from '@/src/trigger/translateNovel'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { novelId, targetLocale, overwrite } = await req.json()
  if (!novelId || !targetLocale) {
    return NextResponse.json({ error: 'Missing novelId or targetLocale' }, { status: 400 })
  }

  // Verify ownership
  const novel = await prisma.novel.findFirst({ where: { id: novelId, authorId: userId } })
  if (!novel) return NextResponse.json({ error: 'Novel not found or not authorized' }, { status: 403 })

  // Check for existing translation
  const existingTr = await prisma.novelTranslation.findUnique({
    where: { novelId_locale: { novelId, locale: targetLocale } },
  })

  if (existingTr) {
    if (existingTr.status === 'published' && !overwrite) {
      return NextResponse.json({ conflict: 'published' }, { status: 409 })
    }
    if ((existingTr.status === 'draft') && !overwrite) {
      return NextResponse.json({ conflict: 'draft' }, { status: 409 })
    }
  }

  // Check for existing in-progress request
  const existingReq = await prisma.translationRequest.findUnique({
    where: { novelId_targetLocale: { novelId, targetLocale } },
  })

  if (existingReq && (existingReq.status === 'pending' || existingReq.status === 'processing')) {
    return NextResponse.json({ conflict: 'processing' }, { status: 409 })
  }

  // Count source chapters
  const chapterCount = await prisma.chapter.count({
    where: { novelId, publishStatus: 'published' },
  })

  // Upsert translation request
  const trReq = await prisma.translationRequest.upsert({
    where: { novelId_targetLocale: { novelId, targetLocale } },
    create: { novelId, targetLocale, status: 'pending', totalChapters: chapterCount },
    update: { status: 'pending', doneChapters: 0, totalChapters: chapterCount, triggerRunId: null, errorMessage: null },
  })

  // Trigger the task
  const handle = await tasks.trigger<typeof translateNovel>('translate-novel', {
    translationRequestId: trReq.id,
    novelId,
    targetLocale,
  })

  // Store run ID
  await prisma.translationRequest.update({
    where: { id: trReq.id },
    data: { triggerRunId: handle.id },
  })

  return NextResponse.json({ success: true, runId: handle.id })
}
