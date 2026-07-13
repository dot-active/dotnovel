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

  const body = await req.json()
  const { content, chapterId, paragraphIndex, parentId, nickname } = body

  if (!content?.trim() || !chapterId || paragraphIndex === undefined) {
    return NextResponse.json({ error: '内容不能为空' }, { status: 400 })
  }

  if (content.trim().length > 500) {
    return NextResponse.json({ error: '留言不能超过500字' }, { status: 400 })
  }

  const chapter = await prisma.chapter.findUnique({ where: { id: chapterId } })
  if (!chapter) return NextResponse.json({ error: 'Chapter not found' }, { status: 404 })

  if (parentId) {
    const parent = await prisma.comment.findUnique({ where: { id: parentId } })
    if (!parent) return NextResponse.json({ error: 'Parent comment not found' }, { status: 404 })
  }

  const ipAddress = req.headers.get('x-forwarded-for')?.split(',')[0].trim()
    ?? req.headers.get('x-real-ip')
    ?? 'unknown'

  const comment = await prisma.comment.create({
    data: {
      content: content.trim(),
      chapterId,
      paragraphIndex: parseInt(paragraphIndex, 10),
      parentId: parentId ?? null,
      userId: userId ?? null,
      nickname: !userId ? (typeof nickname === 'string' ? nickname.trim() || null : null) : null,
      ipAddress: userId ? null : ipAddress,
    },
  })

  return NextResponse.json(comment, { status: 201 })
}
