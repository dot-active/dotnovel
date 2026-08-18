import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Publishes every draft translation of a single chapter, across all locales.
export async function POST(_req: NextRequest, { params }: { params: { chapterId: string } }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const chapter = await prisma.chapter.findFirst({
    where: { id: params.chapterId },
    include: { novel: { select: { authorId: true } } },
  })
  if (!chapter || chapter.novel.authorId !== userId) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const { count: publishedLocales } = await prisma.chapterTranslation.updateMany({
    where: { chapterId: params.chapterId, status: 'draft' },
    data: { status: 'published' },
  })

  return NextResponse.json({ success: true, publishedLocales })
}
