import { auth, currentUser } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

async function requireAdmin() {
  const { userId } = await auth()
  if (!userId) return false
  const user = await currentUser()
  return user?.publicMetadata?.role === 'admin'
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json().catch(() => ({}))
  const soft = body.soft !== false

  if (soft) {
    await prisma.comment.update({
      where: { id: params.id },
      data: { isDeleted: true },
    })
  } else {
    await prisma.comment.delete({ where: { id: params.id } })
  }

  return NextResponse.json({ success: true })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  if (typeof body.isDeleted !== 'boolean') {
    return NextResponse.json({ error: 'isDeleted must be boolean' }, { status: 400 })
  }

  const comment = await prisma.comment.update({
    where: { id: params.id },
    data: { isDeleted: body.isDeleted },
  })

  return NextResponse.json(comment)
}
