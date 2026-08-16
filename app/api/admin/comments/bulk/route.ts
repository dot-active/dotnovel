import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthRole } from '@/lib/auth'

export async function DELETE(req: NextRequest) {
  const { userId, isAdmin } = await getAuthRole()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json()
  const { ids, soft } = body
  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: 'ids required' }, { status: 400 })
  }

  if (soft !== false) {
    await prisma.comment.updateMany({
      where: { id: { in: ids } },
      data: { isDeleted: true },
    })
  } else {
    await prisma.comment.deleteMany({
      where: { id: { in: ids } },
    })
  }

  return NextResponse.json({ success: true, count: ids.length })
}
