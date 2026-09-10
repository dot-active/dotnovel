import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Explicit select — ipAddress must never reach these public, unauthenticated
// endpoints (it's only for admin moderation, see /api/admin/comments).
const publicCommentFields = {
  id: true,
  content: true,
  chapterId: true,
  paragraphIndex: true,
  parentId: true,
  isReadByReceiver: true,
  createdAt: true,
  updatedAt: true,
  isDeleted: true,
  userId: true,
  nickname: true,
} as const

type CommentNode = { isDeleted: boolean; replies?: CommentNode[] } & Record<string, unknown>

// The novel's author gets no trace that a deleted comment ever existed — not
// even a "[deleted]" placeholder — so deleted nodes are dropped entirely and
// any surviving (non-deleted) replies are re-parented one level up, as if
// the deleted comment had never been posted. Other viewers still see the
// isDeleted flag and render a placeholder client-side (see ParagraphComments).
// The query's deepest nesting level has no `replies` selection at all, so
// this treats a missing `replies` the same as an empty list.
function stripDeletedForAuthor<T extends CommentNode>(list: T[]): T[] {
  const result: T[] = []
  for (const comment of list) {
    const replies = stripDeletedForAuthor((comment.replies ?? []) as T[])
    if (comment.isDeleted) {
      result.push(...replies)
    } else {
      result.push({ ...comment, replies } as T)
    }
  }
  return result
}

export async function GET(req: Request) {
  const { userId } = await auth()
  const { searchParams } = new URL(req.url)
  const chapterId = searchParams.get('chapterId')
  const paragraphIndex = searchParams.get('paragraphIndex')

  if (!chapterId || paragraphIndex === null) {
    return NextResponse.json({ error: 'chapterId and paragraphIndex required' }, { status: 400 })
  }

  const [chapter, comments] = await Promise.all([
    prisma.chapter.findUnique({ where: { id: chapterId }, select: { novel: { select: { authorId: true } } } }),
    prisma.comment.findMany({
      where: {
        chapterId,
        paragraphIndex: parseInt(paragraphIndex, 10),
        parentId: null,
      },
      select: {
        ...publicCommentFields,
        replies: {
          select: {
            ...publicCommentFields,
            replies: {
              select: {
                ...publicCommentFields,
                replies: { select: publicCommentFields },
              },
              orderBy: { createdAt: 'asc' },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'asc' },
    }),
  ])

  const isNovelAuthor = userId !== null && chapter?.novel.authorId === userId
  const result = isNovelAuthor ? stripDeletedForAuthor(comments) : comments

  return NextResponse.json(result)
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
    select: publicCommentFields,
  })

  return NextResponse.json(comment, { status: 201 })
}
