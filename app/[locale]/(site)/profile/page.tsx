import { redirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { auth } from '@clerk/nextjs/server'
import ProfilePointsClient from './_components/ProfilePointsClient'

export default async function ProfilePage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)

  const { userId } = await auth()
  if (!userId) redirect(`/${locale}/sign-in`)

  return <ProfilePointsClient locale={locale} />
}
