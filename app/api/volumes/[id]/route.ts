import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PATCH /api/volumes/[id]  — update volume translations (author only)
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const volume = await prisma.volume.findFirst({
    where: { id: params.id },
    include: { novel: { select: { authorId: true } } },
  })
  if (!volume || volume.novel.authorId !== userId) {
    return NextResponse.json({ error: 'Not found or unauthorized' }, { status: 404 })
  }

  const body = await req.json()
  const { translations } = body as {
    translations: Record<string, { title: string }>
  }

  // Replace all translations: locales with content become published, empty ones are dropped
  const newTranslations = Object.entries(translations || {})
    .filter(([, content]) => content.title.trim())
    .map(([locale, content]) => ({
      locale,
      title: content.title.trim(),
      status: 'published',
    }))

  const [, updated] = await prisma.$transaction([
    prisma.volumeTranslation.deleteMany({ where: { volumeId: params.id } }),
    prisma.volume.update({
      where: { id: params.id },
      data: { translations: { create: newTranslations } },
      include: { translations: true },
    }),
  ])

  return NextResponse.json(updated)
}

// DELETE /api/volumes/[id]  — delete volume; its chapters become unvolumed
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const volume = await prisma.volume.findFirst({
    where: { id: params.id },
    include: { novel: { select: { authorId: true } } },
  })
  if (!volume || volume.novel.authorId !== userId) {
    return NextResponse.json({ error: 'Not found or unauthorized' }, { status: 404 })
  }

  await prisma.$transaction([
    // Detach chapters (set volumeId = null) — chapters are NOT deleted
    prisma.chapter.updateMany({
      where: { volumeId: params.id },
      data: { volumeId: null },
    }),
    // VolumeTranslation rows cascade-delete with the volume
    prisma.volume.delete({ where: { id: params.id } }),
  ])

  return NextResponse.json({ success: true })
}
