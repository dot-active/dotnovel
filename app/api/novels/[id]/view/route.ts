import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const COOKIE_PREFIX = 'viewed_'
const COOKIE_MAX_AGE = 60 * 60 * 24 // 24h — one counted view per novel per browser per day

// In-memory, best-effort dedup for callers that don't carry cookies (e.g.
// scripted repeat POSTs). Not distributed/durable across server instances,
// but meaningfully raises the bar against a tight loop from one client.
const recentViews = new Map<string, number>()
const IP_WINDOW_MS = 30 * 60 * 1000 // 30 minutes

function pruneRecentViews(now: number) {
  if (recentViews.size < 5000) return
  recentViews.forEach((ts, key) => {
    if (now - ts > IP_WINDOW_MS) recentViews.delete(key)
  })
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const cookieName = `${COOKIE_PREFIX}${params.id}`
  if (req.cookies.get(cookieName)) {
    return NextResponse.json({ ok: true, deduped: true })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const now = Date.now()
  if (ip) {
    const key = `${ip}:${params.id}`
    const last = recentViews.get(key)
    if (last && now - last < IP_WINDOW_MS) {
      return NextResponse.json({ ok: true, deduped: true })
    }
    pruneRecentViews(now)
    recentViews.set(key, now)
  }

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

  const res = NextResponse.json({ ok: true })
  res.cookies.set(cookieName, '1', {
    maxAge: COOKIE_MAX_AGE,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  })
  return res
}
