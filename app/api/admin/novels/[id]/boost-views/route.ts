import { auth, currentUser } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await currentUser()
  if (user?.publicMetadata?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const novel = await prisma.novel.findUnique({
    where: { id: params.id },
    include: { _count: { select: { chapters: true } } },
  })

  if (!novel) {
    return NextResponse.json({ error: 'Novel not found' }, { status: 404 })
  }

  const chapterCount = novel._count.chapters

  let increment: number

  if (chapterCount <= 100) {
    const minRate = 0.10
    const maxRate = 0.40
    const randomRate = Math.random() * (maxRate - minRate) + minRate
    increment = Math.round(chapterCount * randomRate)
  } else {
    increment = Math.floor(Math.random() * 31) + 10
  }

  increment = Math.max(1, increment)

  const authorId = novel.authorId

  // 增加点击数的同时给作者加对应积分
  const updated = await prisma.$transaction(async (tx) => {
    const result = await tx.novel.update({
      where: { id: params.id },
      data: { viewCount: { increment } },
    })

    if (authorId) {
      await tx.authorPoints.upsert({
        where: { userId: authorId },
        update: { points: { increment } },
        create: { userId: authorId, points: increment },
      })
      await tx.authorPointsLog.create({
        data: {
          userId: authorId,
          points: increment,
          reason: `Admin 增加点击（+${increment}次）`,
          novelId: params.id,
        },
      })
    }

    return result
  })

  return NextResponse.json({
    success: true,
    increment,
    newViewCount: updated.viewCount,
  })
}
