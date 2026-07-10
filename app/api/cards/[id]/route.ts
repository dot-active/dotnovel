import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
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
      translations?: {
        locale: string
        titles: string[]
        entries: { content: string; fromChapter: number }[]
      }[]
    }

    // update without include — avoids implicit transaction in Neon HTTP mode
    await prisma.novelCard.update({
      where: { id: params.id },
      data: {
        ...(isActive !== undefined && { isActive }),
        ...(imageUrl !== undefined && { imageUrl: imageUrl || null }),
      },
    })

    if (translations && translations.length > 0) {
      const trs = translations.filter(
        (t) => t.titles.some((title) => title.trim()) || t.entries.some((e) => e.content.trim())
      )
      for (const t of trs) {
        const titles = t.titles.map((title) => title.trim()).filter(Boolean)
        const translation = await prisma.novelCardTranslation.upsert({
          where: { cardId_locale: { cardId: params.id, locale: t.locale } },
          create: {
            cardId: params.id,
            locale: t.locale,
            titles,
            status: 'published',
          },
          update: {
            titles,
            status: 'published',
          },
        })

        // Entries are replaced wholesale — order is derived from array position,
        // preserving whatever order the client kept after additions/deletions.
        await prisma.novelCardEntry.deleteMany({ where: { translationId: translation.id } })
        const entries = t.entries.filter((e) => e.content.trim())
        for (let i = 0; i < entries.length; i++) {
          await prisma.novelCardEntry.create({
            data: {
              translationId: translation.id,
              content: entries[i].content.trim(),
              fromChapter: entries[i].fromChapter,
              order: i + 1,
            },
          })
        }
      }
    }

    const refreshed = await prisma.novelCard.findUnique({
      where: { id: params.id },
      include: {
        translations: {
          orderBy: { locale: 'asc' },
          include: { entries: { orderBy: { order: 'asc' } } },
        },
      },
    })
    return NextResponse.json(refreshed)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[PATCH /api/cards/[id]]', msg)
    return NextResponse.json({ error: process.env.NODE_ENV === 'development' ? msg : '服务器错误' }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
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
  } catch (err) {
    console.error('[DELETE /api/cards/[id]]', err)
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}
