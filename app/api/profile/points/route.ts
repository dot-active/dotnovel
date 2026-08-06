import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const locale = req.nextUrl.searchParams.get('locale') ?? 'zh-CN'
  const page = Math.max(1, parseInt(req.nextUrl.searchParams.get('page') ?? '1', 10) || 1)
  const limit = Math.min(
    100,
    Math.max(1, parseInt(req.nextUrl.searchParams.get('limit') ?? '20', 10) || 20)
  )

  const [account, total, logs] = await Promise.all([
    prisma.authorPoints.findUnique({ where: { userId } }),
    prisma.authorPointsLog.count({ where: { userId } }),
    prisma.authorPointsLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ])

  // 批量取出关联小说标题（优先当前语言的译名）
  const novelIds = Array.from(
    new Set(logs.map((l) => l.novelId).filter((id): id is string => id !== null))
  )
  const novels = novelIds.length
    ? await prisma.novel.findMany({
        where: { id: { in: novelIds } },
        select: {
          id: true,
          title: true,
          translations: { where: { locale }, select: { title: true } },
        },
      })
    : []

  const titleById = new Map(
    novels.map((n) => [n.id, n.translations[0]?.title ?? n.title])
  )

  return NextResponse.json({
    points: account?.points ?? 0,
    hasAccount: account !== null,
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit)),
    logs: logs.map((log) => ({
      id: log.id,
      points: log.points,
      reason: log.reason,
      novelId: log.novelId,
      novelTitle: log.novelId ? titleById.get(log.novelId) ?? null : null,
      createdAt: log.createdAt.toISOString(),
    })),
  })
}
