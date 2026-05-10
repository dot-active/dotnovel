import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { novelId } = await req.json()
  if (!novelId) return NextResponse.json({ error: 'novelId required' }, { status: 400 })

  try {
    const [favorite] = await prisma.$transaction([
      prisma.favorite.create({ data: { userId, novelId } }),
      prisma.novel.update({
        where: { id: novelId },
        data: { favoriteCount: { increment: 1 } },
      }),
    ])
    return NextResponse.json(favorite)
  } catch {
    return NextResponse.json({ error: 'Already favorited' }, { status: 409 })
  }
}

export async function DELETE(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { novelId } = await req.json()
  if (!novelId) return NextResponse.json({ error: 'novelId required' }, { status: 400 })

  const deleted = await prisma.favorite.deleteMany({ where: { userId, novelId } })

  if (deleted.count > 0) {
    await prisma.novel.update({
      where: { id: novelId },
      data: { favoriteCount: { decrement: 1 } },
    })
  }

  return NextResponse.json({ success: true })
}
