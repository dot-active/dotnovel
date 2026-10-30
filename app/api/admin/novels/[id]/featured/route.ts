import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { getAuthRole } from '@/lib/auth'
import { invalidatePublicContent } from '@/lib/publicData'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId, isAdmin } = await getAuthRole()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json()
  const { isFeatured } = body
  if (typeof isFeatured !== 'boolean') {
    return NextResponse.json({ error: 'Invalid body: isFeatured must be boolean' }, { status: 400 })
  }

  const novel = await prisma.novel.update({
    where: { id: params.id },
    data: { isFeatured },
  })

  invalidatePublicContent()
  revalidatePath('/', 'layout')
  return NextResponse.json({ id: novel.id, isFeatured: novel.isFeatured })
}
