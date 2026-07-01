import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const card = await prisma.novelCard.findFirst({
    where: { id: params.id },
    include: { novel: { select: { authorId: true } } },
  })
  if (!card || card.novel.authorId !== userId)
    return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = await req.json()
  const { isActive, imageUrl, translations } = body as {
    isActive?: boolean
    imageUrl?: string
    translations?: { locale: string; title: string; description: string }[]
  }

  const updated = await prisma.novelCard.update({
    where: { id: params.id },
    data: {
      ...(isActive !== undefined && { isActive }),
      ...(imageUrl !== undefined && { imageUrl: imageUrl || null }),
    },
    include: { translations: true },
  })

  if (translations && translations.length > 0) {
    await Promise.all(
      translations
        .filter((t) => t.title.trim() || t.description.trim())
        .map((t) =>
          prisma.novelCardTranslation.upsert({
            where: { cardId_locale: { cardId: params.id, locale: t.locale } },
            create: {
              cardId: params.id,
              locale: t.locale,
              title: t.title.trim(),
              description: t.description.trim(),
              status: 'published',
            },
            update: {
              title: t.title.trim(),
              description: t.description.trim(),
              status: 'published',
            },
          })
        )
    )

    const refreshed = await prisma.novelCard.findUnique({
      where: { id: params.id },
      include: { translations: { orderBy: { locale: 'asc' } } },
    })
    return NextResponse.json(refreshed)
  }

  return NextResponse.json(updated)
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const card = await prisma.novelCard.findFirst({
    where: { id: params.id },
    include: { novel: { select: { authorId: true } } },
  })
  if (!card || card.novel.authorId !== userId)
    return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await prisma.novelCard.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
