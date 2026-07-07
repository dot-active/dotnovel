import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { auth } from '@clerk/nextjs/server'
import { Link } from '@/i18n/navigation'
import { prisma } from '@/lib/prisma'
import CardManager from '../_components/CardManager'
import styles from './page.module.css'

export default async function CardManagerPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations('cardManager')
  const { userId } = await auth()

  const novel = await prisma.novel.findFirst({
    where: { id, authorId: userId! },
    include: {
      translations: { where: { locale: { in: ['zh-CN', 'zh-TW', 'en', 'ja', 'ko', 'es'] } } },
    },
  })

  if (!novel) notFound()

  const availableLocales = Array.from(
    new Set([novel.sourceLocale, ...novel.translations.map((tr) => tr.locale)])
  )

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link href={`/author/novels/${id}/edit`} className={styles.back}>
          ← {t('backToEdit')}
        </Link>
      </div>

      <CardManager
        novelId={novel.id}
        sourceLocale={novel.sourceLocale}
        availableLocales={availableLocales}
      />
    </div>
  )
}
