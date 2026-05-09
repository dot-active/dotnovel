import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { prisma } from '@/lib/prisma'
import CreateNovelForm from './_components/CreateNovelForm'
import styles from './page.module.css'

export default async function NewNovelPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations('author')

  const categories = await prisma.category.findMany({ orderBy: { slug: 'asc' } })

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <Link href="/author/dashboard" className={styles.backLink}>
          ← {t('myNovels')}
        </Link>
        <h1 className={styles.title}>{t('createNovel')}</h1>
      </div>
      <CreateNovelForm categories={categories} locale={locale} />
    </div>
  )
}
