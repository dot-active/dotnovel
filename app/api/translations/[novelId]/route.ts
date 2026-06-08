import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { runs } from '@trigger.dev/sdk/v3'

const STUCK_STATUSES = new Set(['CANCELED', 'FAILED', 'CRASHED', 'TIMED_OUT', 'SYSTEM_FAILURE', 'EXPIRED'])

export async function GET(
  _req: NextRequest,
  { params }: { params: { novelId: string } }
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { novelId } = params

  const novel = await prisma.novel.findFirst({ where: { id: novelId, authorId: userId } })
  if (!novel) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const [requests, novelTranslations] = await Promise.all([
    prisma.translationRequest.findMany({ where: { novelId } }),
    prisma.novelTranslation.findMany({ where: { novelId }, select: { locale: true, status: true } }),
  ])

  // Sync stuck runs: if DB says processing/pending but Trigger.dev says canceled/failed, update DB
  for (const req of requests) {
    if ((req.status === 'processing' || req.status === 'pending') && req.triggerRunId) {
      try {
        const triggerRun = await runs.retrieve(req.triggerRunId)
        if (STUCK_STATUSES.has(triggerRun.status)) {
          await prisma.translationRequest.update({
            where: { id: req.id },
            data: { status: 'failed', errorMessage: `Task ${triggerRun.status.toLowerCase()}` },
          })
          req.status = 'failed'
          req.errorMessage = `Task ${triggerRun.status.toLowerCase()}`
        }
      } catch {
        // Trigger.dev API unreachable — leave status as-is
      }
    }
  }

  return NextResponse.json({ requests, novelTranslations })
}

export async function POST(
  req: NextRequest,
  { params }: { params: { novelId: string } }
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { novelId } = params

  try {
    const { targetLocale } = await req.json()

    if (!targetLocale) {
      return NextResponse.json({ success: false, error: 'targetLocale is required' }, { status: 400 })
    }

    const novel = await prisma.novel.findFirst({ where: { id: novelId, authorId: userId } })
    if (!novel) return NextResponse.json({ success: false, error: 'Not found' }, { status: 403 })

    // Only chapters carry a draft/published distinction — NovelTranslation
    // (title/synopsis) is published as soon as it's translated.
    const chapterIds = await prisma.chapter.findMany({
      where: { novelId },
      select: { id: true },
    })

    await prisma.chapterTranslation.updateMany({
      where: { chapterId: { in: chapterIds.map(c => c.id) }, locale: targetLocale, status: 'draft' },
      data: { status: 'published' },
    })

    await prisma.translationRequest.update({
      where: { novelId_targetLocale: { novelId, targetLocale } },
      data: { status: 'published' },
    }).catch(() => { /* no request record — skip */ })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[publish translation]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
