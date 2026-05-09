'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { cookies } from 'next/headers'

export async function completeOnboarding(formData: FormData) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const isAdult = formData.get('isAdult') === 'true'

  // Always mark onboarding as complete regardless of age choice
  cookies().set('onboarding_done', '1', {
    maxAge: 60 * 60 * 24 * 365 * 10,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  })

  if (isAdult) {
    const client = await clerkClient()
    await client.users.updateUserMetadata(userId, {
      publicMetadata: { isAdult: true },
    })

    cookies().set('age_verified', '1', {
      maxAge: 60 * 60 * 24 * 365 * 10,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    })
  }
}
