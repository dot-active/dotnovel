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

  const [novel, maxOrder] = await Promise.all([
    prisma.novel.findFirst({
      where: { id, authorId: userId! },
      include: {
        translations: { where: { locale }, select: { title: true } },
        volumes: {
          orderBy: { order: 'asc' },
          include: { translations: true },
        },
      },
    }),
    prisma.chapter.aggregate({ where: { novelId: id }, _max: { order: true } }),
  ])

  if (!novel) notFound()

  const volumeOptions = novel.volumes.map((v) => ({
    id: v.id,
    title:
      v.translations.find((tr) => tr.locale === locale)?.title ??
      v.translations[0]?.title ??
      '未命名',
  }))

  // Chapter.order is only unique per-novel, and deleting a chapter never
  // renumbers the ones after it — basing the suggestion on the highest
  // existing order (not the chapter count) keeps it collision-free even
  // after deletions leave gaps.
  const nextOrder =
    searchParams.order != null
      ? parseInt(searchParams.order, 10)
      : (maxOrder._max.order ?? 0) + 1

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
        volumes={volumeOptions}
      />
    </div>
  )
}
