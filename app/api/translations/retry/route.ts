import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { tasks } from '@trigger.dev/sdk/v3'
import type { translateNovel } from '@/src/trigger/translateNovel'

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
  if (!trReq) return NextResponse.json({ error: 'Translation request not found' }, { status: 404 })

  const chapterCount = await prisma.chapter.count({
    where: { novelId, publishStatus: 'published' },
  })

  await prisma.translationRequest.update({
    where: { id: trReq.id },
    data: { status: 'pending', doneChapters: 0, totalChapters: chapterCount, errorMessage: null },
  })

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
}
