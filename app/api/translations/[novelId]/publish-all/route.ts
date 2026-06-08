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

  // updateMany requires transaction support, which the Neon HTTP adapter
  // doesn't provide — update matching rows individually instead
  const draftTranslations = await prisma.chapterTranslation.findMany({
    where: { chapterId: { in: chapters.map(c => c.id) }, status: 'draft' },
    select: { id: true },
  })
  for (const { id } of draftTranslations) {
    await prisma.chapterTranslation.update({ where: { id }, data: { status: 'published' } })
  }

  const completedRequests = await prisma.translationRequest.findMany({
    where: { novelId, status: 'completed' },
    select: { id: true },
  })
  for (const { id } of completedRequests) {
    await prisma.translationRequest.update({ where: { id }, data: { status: 'published' } })
  }

  return NextResponse.json({ success: true })
}
