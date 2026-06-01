import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { novelId, targetLocale } = await req.json()
  if (!novelId || !targetLocale) {
    return NextResponse.json({ error: 'Missing novelId or targetLocale' }, { status: 400 })
  }

  const novel = await prisma.novel.findFirst({ where: { id: novelId, authorId: userId } })
  if (!novel) return NextResponse.json({ error: 'Novel not found or not authorized' }, { status: 403 })

  await prisma.translationRequest.update({
    where: { novelId_targetLocale: { novelId, targetLocale } },
    data: { status: 'paused' },
  })

  return NextResponse.json({ success: true })
}
