import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: 'desc' },
    include: { reads: { where: { userId }, select: { id: true } } },
  })

  const items = announcements.map((a) => ({
    id: a.id,
    title: a.title,
    content: a.content,
    createdAt: a.createdAt.toISOString(),
    isRead: a.reads.length > 0,
  }))

  const unreadCount = items.filter((item) => !item.isRead).length

  return NextResponse.json({ items, unreadCount })
}
