import { auth, currentUser } from '@clerk/nextjs/server'

// Single source of truth for "is this caller an admin" — reused by admin
// server actions (lib/actions/admin.ts) and every app/api/admin/** route.
export async function getAuthRole(): Promise<{ userId: string | null; isAdmin: boolean }> {
  const { userId } = await auth()
  if (!userId) return { userId: null, isAdmin: false }
  const user = await currentUser()
  return { userId, isAdmin: user?.publicMetadata?.role === 'admin' }
}
