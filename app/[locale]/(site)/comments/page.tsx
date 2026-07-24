import { setRequestLocale } from 'next-intl/server'
import CommentsPageClient from './_components/CommentsPageClient'

export default async function CommentsPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)

  return <CommentsPageClient locale={locale} />
}
