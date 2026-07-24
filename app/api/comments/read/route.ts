import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { chapterId, paragraphIndex, commentId, type } = body

  if (type === 'author') {
    if (!chapterId || paragraphIndex === undefined) {
      return NextResponse.json({ error: 'chapterId and paragraphIndex required' }, { status: 400 })
    }

    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId },
      select: { novel: { select: { authorId: true } } },
    })
    if (!chapter) return NextResponse.json({ error: 'Chapter not found' }, { status: 404 })
    if (chapter.novel.authorId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.comment.updateMany({
      where: { chapterId, paragraphIndex: parseInt(paragraphIndex, 10), isDeleted: false },
      data: { isReadByReceiver: true },
    })

    return NextResponse.json({ success: true })
  }

  if (type === 'reply') {
    if (!commentId) return NextResponse.json({ error: 'commentId required' }, { status: 400 })

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { userId: true },
    })
    if (!comment) return NextResponse.json({ error: 'Comment not found' }, { status: 404 })
    if (comment.userId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.comment.updateMany({
      where: { parentId: commentId, isDeleted: false },
      data: { isReadByReceiver: true },
    })

    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'type must be "author" or "reply"' }, { status: 400 })
}
