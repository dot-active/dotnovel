import { auth, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const comment = await prisma.comment.findUnique({
    where: { id: params.id },
    include: { chapter: { select: { novel: { select: { authorId: true } } } } },
  })
  if (!comment) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const user = await currentUser()
  const isAdmin = user?.publicMetadata?.role === 'admin'
  const isCommentAuthor = comment.authorId === userId
  const isNovelAuthor = comment.chapter.novel.authorId === userId

  if (!isCommentAuthor && !isAdmin && !isNovelAuthor) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await prisma.comment.update({
    where: { id: params.id },
    data: { isDeleted: true },
  })

  return NextResponse.json({ success: true })
}
