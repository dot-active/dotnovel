import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

export default async function AuthorLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  setRequestLocale(locale)
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')
  return <>{children}</>
}
