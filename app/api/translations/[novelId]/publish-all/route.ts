import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  _req: NextRequest,
  { params }: { params: { novelId: string } }
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { novelId } = params

  const novel = await prisma.novel.findFirst({ where: { id: novelId, authorId: userId } })
  if (!novel) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const chapters = await prisma.chapter.findMany({
    where: { novelId },
    select: { id: true },
  })

  const [{ count: publishedChapters }] = await Promise.all([
    prisma.chapterTranslation.updateMany({
      where: { chapterId: { in: chapters.map((c) => c.id) }, status: 'draft' },
      data: { status: 'published' },
    }),
    prisma.translationRequest.updateMany({
      where: { novelId, status: 'completed' },
      data: { status: 'published' },
    }),
  ])

  return NextResponse.json({ success: true, publishedChapters })
}
