import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.novel.update({
    where: { id: params.id },
    data: { viewCount: { increment: 1 } },
  })
  return NextResponse.json({ ok: true })
}
