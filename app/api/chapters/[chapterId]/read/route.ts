import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest, { params }: { params: { chapterId: string } }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ ok: true, awarded: false })

  const chapter = await prisma.chapter.findUnique({
    where: { id: params.chapterId },
    select: { novelId: true },
  })
  if (!chapter) return NextResponse.json({ error: 'Chapter not found' }, { status: 404 })

  // 注册用户每阅读一个章节，积分加一（每人每章仅计一次）
  try {
    await prisma.$transaction([
      prisma.chapterRead.create({
        data: { userId, chapterId: params.chapterId },
      }),
      prisma.authorPoints.upsert({
        where: { userId },
        update: { points: { increment: 1 } },
        create: { userId, points: 1 },
      }),
      prisma.authorPointsLog.create({
        data: {
          userId,
          points: 1,
          reason: '阅读章节',
          novelId: chapter.novelId,
        },
      }),
    ])
    return NextResponse.json({ ok: true, awarded: true })
  } catch {
    // Already read this chapter — no error, just no additional points.
    return NextResponse.json({ ok: true, awarded: false })
  }
}
