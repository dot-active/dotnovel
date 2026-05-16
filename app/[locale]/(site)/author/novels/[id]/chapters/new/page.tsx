import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { auth } from '@clerk/nextjs/server'
import { Link } from '@/i18n/navigation'
import { prisma } from '@/lib/prisma'
import AddChapterForm from './_components/AddChapterForm'
import styles from './page.module.css'

export default async function NewChapterPage({
  params: { locale, id },
  searchParams,
}: {
  params: { locale: string; id: string }
  searchParams: { order?: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations('author')
  const { userId } = await auth()

  const novel = await prisma.novel.findFirst({
    where: { id, authorId: userId! },
    include: {
      translations: { where: { locale }, select: { title: true } },
      _count: { select: { chapters: true } },
    },
  })

  if (!novel) notFound()

  const nextOrder =
    searchParams.order != null
      ? parseInt(searchParams.order, 10)
      : novel._count.chapters + 1

  const novelTitle = novel.translations[0]?.title ?? novel.title

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <Link href="/author/dashboard" className={styles.backLink}>
          ← {t('myNovels')}
        </Link>
        <h1 className={styles.title}>
          {t('addChapter')} · {novelTitle}
        </h1>
        <p className={styles.meta}>
          当前章节序号：{nextOrder}
          {novel.sourceLocale !== locale && (
            <span className={styles.localeBadge}> · {novel.sourceLocale}</span>
          )}
        </p>
      </div>

      <AddChapterForm
        key={nextOrder}
        novelId={id}
        locale={locale}
        sourceLocale={novel.sourceLocale}
        defaultOrder={nextOrder}
      />
    </div>
  )
}
