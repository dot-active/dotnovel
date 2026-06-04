import { auth, currentUser } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await currentUser()
  if (user?.publicMetadata?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const { isFeatured } = body
  if (typeof isFeatured !== 'boolean') {
    return NextResponse.json({ error: 'Invalid body: isFeatured must be boolean' }, { status: 400 })
  }

  const novel = await prisma.novel.update({
    where: { id: params.id },
    data: { isFeatured },
  })

  revalidatePath('/', 'layout')
  return NextResponse.json({ id: novel.id, isFeatured: novel.isFeatured })
}
