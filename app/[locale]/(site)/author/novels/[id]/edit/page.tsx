import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { auth } from '@clerk/nextjs/server'
import { Link } from '@/i18n/navigation'
import { prisma } from '@/lib/prisma'
import EditNovelForm from './_components/EditNovelForm'
import TranslationManager from './_components/TranslationManager'
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
        categories: { select: { categoryId: true } },
      },
    }),
    prisma.category.findMany({ orderBy: { slug: 'asc' } }),
  ])

  if (!novel) notFound()

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
          categoryIds: novel.categories.map((c) => c.categoryId),
          status: novel.status,
          coverUrl: novel.coverUrl ?? '',
          sourceLocale: novel.sourceLocale,
          isAdult: novel.isAdult,
        }}
        categories={categories}
        locale={locale}
      />

      <TranslationManager novelId={novel.id} sourceLocale={novel.sourceLocale} locale={locale} />
    </div>
  )
}
