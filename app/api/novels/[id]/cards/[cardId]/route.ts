import { NextResponse } from 'next/server'

// Superseded by /api/cards/[id] — kept as stub to avoid 404s
export async function PUT() {
  return NextResponse.json({ error: 'Use /api/cards/[id]' }, { status: 410 })
}

export async function DELETE() {
  return NextResponse.json({ error: 'Use /api/cards/[id]' }, { status: 410 })
}
