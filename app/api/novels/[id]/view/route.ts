import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const novel = await prisma.novel.findUnique({
    where: { id: params.id },
    select: { authorId: true },
  })

  if (!novel) {
    return NextResponse.json({ error: 'Novel not found' }, { status: 404 })
  }

  const authorId = novel.authorId

  // 阅读数 +1，同时给作者加 1 积分（无作者的小说只加阅读数）
  await prisma.$transaction([
    prisma.novel.update({
      where: { id: params.id },
      data: { viewCount: { increment: 1 } },
    }),
    ...(authorId
      ? [
          prisma.authorPoints.upsert({
            where: { userId: authorId },
            update: { points: { increment: 1 } },
            create: { userId: authorId, points: 1 },
          }),
          prisma.authorPointsLog.create({
            data: {
              userId: authorId,
              points: 1,
              reason: '小说阅读',
              novelId: params.id,
            },
          }),
        ]
      : []),
  ])

  return NextResponse.json({ ok: true })
}
