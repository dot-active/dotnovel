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

  // NovelTranslation never sits in 'draft' — it's published as soon as it's
  // created/translated. Only chapters carry a draft/published distinction.
  if (existingTr && existingTr.status === 'published' && !overwrite) {
    return NextResponse.json({ conflict: 'published' }, { status: 409 })
  }

  // Check for existing in-progress request
  const existingReq = await prisma.translationRequest.findUnique({
    where: { novelId_targetLocale: { novelId, targetLocale } },
  })

  // Only block if a job is actually running (triggerRunId set). A pending request
  // with no triggerRunId means the user pre-selected this locale at creation time
  // but hasn't triggered the job yet — allow proceeding.
  if (existingReq?.triggerRunId && (existingReq.status === 'pending' || existingReq.status === 'processing')) {
    return NextResponse.json({ conflict: 'processing' }, { status: 409 })
  }

  if (existingReq?.status === 'paused' && !overwrite) {
    return NextResponse.json({ conflict: 'paused' }, { status: 409 })
  }

  // Count source chapters
  const chapterCount = await prisma.chapter.count({
    where: { novelId, publishStatus: 'published' },
  })

  // Upsert translation request (triggerRunId cleared so stuck-run sync ignores it)
  const trReq = await prisma.translationRequest.upsert({
    where: { novelId_targetLocale: { novelId, targetLocale } },
    create: { novelId, targetLocale, status: 'pending', totalChapters: chapterCount },
    update: { status: 'pending', doneChapters: 0, totalChapters: chapterCount, triggerRunId: null, errorMessage: null },
  })

  // Trigger the task — revert to failed if this fails so the DB never stays in
  // the "pending + no triggerRunId" limbo that shows the '开始翻译' button
  try {
    const handle = await tasks.trigger<typeof translateNovel>('translate-novel', {
      translationRequestId: trReq.id,
      novelId,
      targetLocale,
    })
    await prisma.translationRequest.update({
      where: { id: trReq.id },
      data: { triggerRunId: handle.id },
    })
    return NextResponse.json({ success: true, runId: handle.id })
  } catch (err) {
    await prisma.translationRequest.update({
      where: { id: trReq.id },
      data: { status: 'failed', errorMessage: 'Failed to queue translation job' },
    })
    return NextResponse.json({ error: 'Failed to trigger task' }, { status: 500 })
  }
}
