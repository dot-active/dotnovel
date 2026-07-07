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
  try {
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

    // Neon HTTP adapter doesn't support implicit transactions (nested writes).
    // Create card and translations as separate sequential queries.
    const card = await prisma.novelCard.create({
      data: { novelId, imageUrl: imageUrl || null },
    })

    const trs = (translations ?? []).filter((t) => t.title.trim() || t.description.trim())
    for (const t of trs) {
      await prisma.novelCardTranslation.create({
        data: {
          cardId: card.id,
          locale: t.locale,
          title: t.title.trim(),
          description: t.description.trim(),
          status: 'published',
        },
      })
    }

    const result = await prisma.novelCard.findUnique({
      where: { id: card.id },
      include: { translations: { orderBy: { locale: 'asc' } } },
    })
    return NextResponse.json(result)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[POST /api/cards]', msg)
    return NextResponse.json({ error: process.env.NODE_ENV === 'development' ? msg : '服务器错误' }, { status: 500 })
  }
}
