import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { auth } from '@clerk/nextjs/server'
import { Link } from '@/i18n/navigation'
import { prisma } from '@/lib/prisma'
import EditNovelForm from './_components/EditNovelForm'
import DeleteNovelButton from '@/components/DeleteNovelButton'
import styles from './page.module.css'

export default async function EditNovelPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations('author')
  const { userId } = await auth()

  const [novel, categories] = await Promise.all([
    prisma.novel.findFirst({
      where: { id, authorId: userId! },
      include: {
        translations: { where: { locale: { in: ['zh-CN', 'zh-TW', 'en', 'ja', 'ko', 'es'] } } },
      },
    }),
    prisma.category.findMany({ orderBy: { slug: 'asc' } }),
  ])

  if (!novel) notFound()

  // Prefer source locale translation for pre-fill, fallback to any
  const sourceTr =
    novel.translations.find((tr) => tr.locale === novel.sourceLocale) ??
    novel.translations[0]

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <Link href="/author/dashboard" className={styles.backLink}>
          ← {t('myNovels')}
        </Link>
        <h1 className={styles.title}>{t('editNovel')} · {sourceTr?.title ?? novel.title}</h1>
      </div>

      <EditNovelForm
        novel={{
          id: novel.id,
          title: sourceTr?.title ?? novel.title,
          description: sourceTr?.description ?? novel.description ?? '',
          author: novel.author,
          categoryId: novel.categoryId ?? '',
          status: novel.status,
          coverUrl: novel.coverUrl ?? '',
          sourceLocale: novel.sourceLocale,
          isAdult: novel.isAdult,
        }}
        categories={categories}
        locale={locale}
      />

      <div className={styles.dangerZone}>
        <h2 className={styles.dangerTitle}>{t('dangerZone')}</h2>
        <p className={styles.dangerDesc}>{t('deleteNovelDesc')}</p>
        <DeleteNovelButton novelId={novel.id} locale={locale} />
      </div>
    </div>
  )
}
