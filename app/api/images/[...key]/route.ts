import { GetObjectCommand } from '@aws-sdk/client-s3'
import { NextResponse } from 'next/server'
import { r2, R2_BUCKET } from '@/lib/r2'

export const runtime = 'nodejs'

export async function GET(
  _req: Request,
  { params: { key } }: { params: { key: string[] } }
) {
  const objectKey = key.join('/')

  try {
    const { Body, ContentType, ContentLength } = await r2.send(
      new GetObjectCommand({ Bucket: R2_BUCKET, Key: objectKey })
    )

    const headers: Record<string, string> = {
      'Content-Type': ContentType ?? 'application/octet-stream',
      'Cache-Control': 'public, max-age=31536000, immutable',
    }
    if (ContentLength) headers['Content-Length'] = String(ContentLength)

    return new Response(Body as ReadableStream, { headers })
  } catch {
    return NextResponse.json({ error: 'Image not found' }, { status: 404 })
  }
}
