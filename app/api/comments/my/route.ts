import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

async function getAuthorCounts(userId: string) {
  return prisma.comment.count({
    where: {
      chapter: { novel: { authorId: userId } },
      userId: { not: userId },
      isDeleted: false,
      isReadByReceiver: false,
    },
  })
}

async function getMineCounts(userId: string) {
  return prisma.comment.count({
    where: {
      parent: { userId },
      chapter: { novel: { authorId: { not: userId } } },
      isDeleted: false,
      isReadByReceiver: false,
    },
  })
}

async function getAuthorItems(userId: string, locale: string) {
  const where = {
    chapter: { novel: { authorId: userId } },
    userId: { not: userId },
    isDeleted: false,
  }

  const [latestPerGroup, unreadGroups, totalGroups] = await Promise.all([
    prisma.comment.findMany({
      where,
      orderBy: [{ chapterId: 'asc' as const }, { paragraphIndex: 'asc' as const }, { createdAt: 'desc' as const }],
      distinct: ['chapterId', 'paragraphIndex'],
      select: {
        chapterId: true,
        paragraphIndex: true,
        content: true,
        userId: true,
        nickname: true,
        createdAt: true,
      },
    }),
    prisma.comment.groupBy({
      by: ['chapterId', 'paragraphIndex'],
      where: { ...where, isReadByReceiver: false },
      _count: { id: true },
    }),
    prisma.comment.groupBy({
      by: ['chapterId', 'paragraphIndex'],
      where,
      _count: { id: true },
    }),
  ])

  const unreadMap = new Map(unreadGroups.map((g) => [`${g.chapterId}:${g.paragraphIndex}`, g._count.id]))
  const totalMap = new Map(totalGroups.map((g) => [`${g.chapterId}:${g.paragraphIndex}`, g._count.id]))

  const chapterIds = Array.from(new Set(latestPerGroup.map((g) => g.chapterId)))
  const chapters = await prisma.chapter.findMany({
    where: { id: { in: chapterIds } },
    select: {
      id: true,
      title: true,
      order: true,
      novelId: true,
      novel: { select: { id: true, title: true, translations: { where: { locale }, select: { title: true } } } },
      translations: { where: { locale }, select: { title: true } },
    },
  })
  const chapterMap = new Map(chapters.map((c) => [c.id, c]))

  const items = latestPerGroup
    .map((g) => {
      const key = `${g.chapterId}:${g.paragraphIndex}`
      const chapter = chapterMap.get(g.chapterId)
      if (!chapter) return null
      return {
        chapterId: g.chapterId,
        paragraphIndex: g.paragraphIndex,
        novelId: chapter.novelId,
        novelTitle: chapter.novel.translations[0]?.title ?? chapter.novel.title,
        chapterTitle: chapter.translations[0]?.title ?? chapter.title,
        chapterOrder: chapter.order,
        totalCount: totalMap.get(key) ?? 0,
        unreadCount: unreadMap.get(key) ?? 0,
        lastComment: {
          userId: g.userId,
          nickname: g.nickname,
          content: g.content,
          createdAt: g.createdAt.toISOString(),
        },
      }
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .sort((a, b) => new Date(b.lastComment.createdAt).getTime() - new Date(a.lastComment.createdAt).getTime())

  return items
}

async function getMineItems(userId: string, locale: string) {
  const comments = await prisma.comment.findMany({
    where: {
      userId,
      isDeleted: false,
      chapter: { novel: { authorId: { not: userId } } },
    },
    include: {
      replies: {
        where: { isDeleted: false },
        orderBy: { createdAt: 'desc' },
      },
      chapter: {
        select: {
          id: true,
          title: true,
          novelId: true,
          novel: { select: { id: true, title: true, translations: { where: { locale }, select: { title: true } } } },
          translations: { where: { locale }, select: { title: true } },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return comments.map((c) => {
    const lastReply = c.replies[0] ?? null
    return {
      id: c.id,
      novelId: c.chapter.novelId,
      novelTitle: c.chapter.novel.translations[0]?.title ?? c.chapter.novel.title,
      chapterId: c.chapter.id,
      chapterTitle: c.chapter.translations[0]?.title ?? c.chapter.title,
      paragraphIndex: c.paragraphIndex,
      content: c.content,
      createdAt: c.createdAt.toISOString(),
      replyCount: c.replies.length,
      unreadReplyCount: c.replies.filter((r) => !r.isReadByReceiver).length,
      lastReply: lastReply
        ? {
            userId: lastReply.userId,
            nickname: lastReply.nickname,
            content: lastReply.content,
            createdAt: lastReply.createdAt.toISOString(),
          }
        : null,
    }
  })
}

export async function GET(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type')
  const locale = searchParams.get('locale') ?? 'zh-CN'

  if (type !== 'author' && type !== 'mine') {
    return NextResponse.json({ error: 'type must be "author" or "mine"' }, { status: 400 })
  }

  const [items, authorUnread, mineUnread] = await Promise.all([
    type === 'author' ? getAuthorItems(userId, locale) : getMineItems(userId, locale),
    getAuthorCounts(userId),
    getMineCounts(userId),
  ])

  return NextResponse.json({
    items,
    counts: { author: authorUnread, mine: mineUnread },
  })
}
