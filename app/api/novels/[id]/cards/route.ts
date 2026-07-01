import { NextResponse } from 'next/server'

// Superseded by /api/cards — kept as stub to avoid 404s
export async function GET() {
  return NextResponse.json({ error: 'Use /api/cards?novelId=...' }, { status: 410 })
}

export async function POST() {
  return NextResponse.json({ error: 'Use /api/cards' }, { status: 410 })
}
