import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const chapterId = searchParams.get('chapterId')
  const paragraphIndex = searchParams.get('paragraphIndex')

  if (!chapterId || paragraphIndex === null) {
    return NextResponse.json({ error: 'chapterId and paragraphIndex required' }, { status: 400 })
  }

  const comments = await prisma.comment.findMany({
    where: {
      chapterId,
      paragraphIndex: parseInt(paragraphIndex, 10),
      parentId: null,
    },
    include: {
      replies: {
        include: {
          replies: {
            include: {
              replies: true,
            },
          },
        },
        orderBy: { createdAt: 'asc' },
      },
    },
    orderBy: { createdAt: 'asc' },
  })

  return NextResponse.json(comments)
}

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { content, chapterId, paragraphIndex, parentId } = body

  if (!content?.trim() || !chapterId || paragraphIndex === undefined) {
    return NextResponse.json({ error: 'content, chapterId, paragraphIndex required' }, { status: 400 })
  }

  const chapter = await prisma.chapter.findUnique({ where: { id: chapterId } })
  if (!chapter) return NextResponse.json({ error: 'Chapter not found' }, { status: 404 })

  if (parentId) {
    const parent = await prisma.comment.findUnique({ where: { id: parentId } })
    if (!parent) return NextResponse.json({ error: 'Parent comment not found' }, { status: 404 })
  }

  const comment = await prisma.comment.create({
    data: {
      content: content.trim(),
      authorId: userId,
      chapterId,
      paragraphIndex: parseInt(paragraphIndex, 10),
      parentId: parentId ?? null,
    },
  })

  return NextResponse.json(comment, { status: 201 })
}
