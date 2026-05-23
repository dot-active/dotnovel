import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _req: NextRequest,
  { params }: { params: { novelId: string } }
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { novelId } = params

  const novel = await prisma.novel.findFirst({ where: { id: novelId, authorId: userId } })
  if (!novel) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const [requests, novelTranslations] = await Promise.all([
    prisma.translationRequest.findMany({ where: { novelId } }),
    prisma.novelTranslation.findMany({ where: { novelId }, select: { locale: true, status: true } }),
  ])

  return NextResponse.json({ requests, novelTranslations })
}

export async function POST(
  req: NextRequest,
  { params }: { params: { novelId: string } }
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { novelId } = params
  const { targetLocale } = await req.json()

  const novel = await prisma.novel.findFirst({ where: { id: novelId, authorId: userId } })
  if (!novel) return NextResponse.json({ error: 'Not found' }, { status: 403 })

  // Publish all draft translations for targetLocale
  await prisma.novelTranslation.updateMany({
    where: { novelId, locale: targetLocale, status: 'draft' },
    data: { status: 'published' },
  })

  const chapterIds = await prisma.chapter.findMany({
    where: { novelId },
    select: { id: true },
  })

  await prisma.chapterTranslation.updateMany({
    where: { chapterId: { in: chapterIds.map(c => c.id) }, locale: targetLocale, status: 'draft' },
    data: { status: 'published' },
  })

  await prisma.translationRequest.updateMany({
    where: { novelId, targetLocale },
    data: { status: 'published' },
  })

  return NextResponse.json({ success: true })
}
