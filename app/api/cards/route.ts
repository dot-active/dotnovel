import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const novelId = searchParams.get('novelId')
  if (!novelId) return NextResponse.json({ error: 'Missing novelId' }, { status: 400 })

  const novel = await prisma.novel.findFirst({ where: { id: novelId, authorId: userId } })
  if (!novel) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const cards = await prisma.novelCard.findMany({
    where: { novelId },
    include: { translations: { orderBy: { locale: 'asc' } } },
    orderBy: { createdAt: 'asc' },
  })
  return NextResponse.json(cards)
}

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { novelId, imageUrl, translations } = body as {
    novelId: string
    imageUrl?: string
    translations: { locale: string; title: string; description: string }[]
  }

  if (!novelId) return NextResponse.json({ error: 'Missing novelId' }, { status: 400 })

  const novel = await prisma.novel.findFirst({ where: { id: novelId, authorId: userId } })
  if (!novel) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const card = await prisma.novelCard.create({
    data: {
      novelId,
      imageUrl: imageUrl || null,
      translations: {
        create: (translations ?? [])
          .filter((t) => t.title.trim() || t.description.trim())
          .map((t) => ({
            locale: t.locale,
            title: t.title.trim(),
            description: t.description.trim(),
            status: 'published',
          })),
      },
    },
    include: { translations: true },
  })
  return NextResponse.json(card)
}
