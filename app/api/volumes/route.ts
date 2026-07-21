import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/volumes?novelId=xxx  — list all volumes of a novel
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const novelId = searchParams.get('novelId')

  if (!novelId) {
    return NextResponse.json({ error: 'novelId is required' }, { status: 400 })
  }

  const volumes = await prisma.volume.findMany({
    where: { novelId },
    include: { translations: true },
    orderBy: { order: 'asc' },
  })

  return NextResponse.json(volumes)
}

// POST /api/volumes  — create a volume (author only)
export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { novelId, translations } = body as {
    novelId: string
    translations: Record<string, { title: string }>
  }

  const novel = await prisma.novel.findFirst({
    where: { id: novelId, authorId: userId },
  })
  if (!novel) {
    return NextResponse.json({ error: 'Novel not found or unauthorized' }, { status: 404 })
  }

  // New volume goes to the end: max(order) + 1
  const maxOrder = await prisma.volume.aggregate({
    where: { novelId },
    _max: { order: true },
  })
  const nextOrder = (maxOrder._max.order ?? 0) + 1

  const volume = await prisma.volume.create({
    data: {
      novelId,
      order: nextOrder,
      translations: {
        create: Object.entries(translations || {})
          .filter(([, content]) => content.title.trim())
          .map(([locale, content]) => ({
            locale,
            title: content.title.trim(),
            status: 'published',
          })),
      },
    },
    include: { translations: true },
  })

  return NextResponse.json(volume)
}
