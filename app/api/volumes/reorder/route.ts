import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PATCH /api/volumes/reorder  — reorder volumes within a novel (author only)
export async function PATCH(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { novelId, volumeIds } = body as { novelId: string; volumeIds: string[] }

  if (!novelId || !volumeIds?.length) {
    return NextResponse.json({ error: 'novelId and volumeIds are required' }, { status: 400 })
  }

  // Verify novel ownership
  const novel = await prisma.novel.findFirst({
    where: { id: novelId, authorId: userId },
  })
  if (!novel) {
    return NextResponse.json({ error: 'Novel not found or unauthorized' }, { status: 404 })
  }

  // Verify every volume belongs to this novel
  const owned = await prisma.volume.findMany({
    where: { id: { in: volumeIds }, novelId },
    select: { id: true },
  })
  if (owned.length !== volumeIds.length) {
    return NextResponse.json({ error: 'Some volumes do not belong to this novel' }, { status: 400 })
  }

  // Apply new order = array index + 1
  await prisma.$transaction(
    volumeIds.map((id, index) =>
      prisma.volume.update({ where: { id }, data: { order: index + 1 } })
    )
  )

  return NextResponse.json({ success: true })
}
