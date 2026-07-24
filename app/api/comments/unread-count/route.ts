import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const [authorUnread, mineUnread] = await Promise.all([
    prisma.comment.count({
      where: {
        chapter: { novel: { authorId: userId } },
        userId: { not: userId },
        isDeleted: false,
        isReadByReceiver: false,
      },
    }),
    prisma.comment.count({
      where: {
        parent: { userId },
        chapter: { novel: { authorId: { not: userId } } },
        isDeleted: false,
        isReadByReceiver: false,
      },
    }),
  ])

  return NextResponse.json({ total: authorUnread + mineUnread })
}
