import { clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clerkClient()
    const user = await client.users.getUser(params.id)
    return NextResponse.json({
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
    })
  } catch {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }
}
