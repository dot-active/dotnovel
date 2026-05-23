import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { auth } from '@clerk/nextjs/server'
import { Link } from '@/i18n/navigation'
import { prisma } from '@/lib/prisma'
import TranslationsReview from './_components/TranslationsReview'
import styles from './page.module.css'

const LOCALES = [
  { value: 'zh-CN', label: '简体中文' },
  { value: 'zh-TW', label: '繁體中文' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' },
  { value: 'es', label: 'Español' },
]

export default async function TranslationsPage({
  params: { locale, id },
  searchParams,
}: {
  params: { locale: string; id: string }
  searchParams: { lang?: string }
}) {
  setRequestLocale(locale)
  const { userId } = await auth()

  const novel = await prisma.novel.findFirst({
    where: { id, authorId: userId! },
    include: {
      translations: true,
      chapters: {
        where: { publishStatus: 'published' },
        orderBy: { order: 'asc' },
        include: { translations: true },
      },
    },
  })
  if (!novel) notFound()

  const availableLocales = LOCALES.filter(l => l.value !== novel.sourceLocale)
  const translatedLocales = availableLocales.filter(l =>
    novel.translations.some(t => t.locale === l.value)
  )

  const activeLocale = searchParams.lang ?? translatedLocales[0]?.value ?? null

  const activeLang = LOCALES.find(l => l.value === activeLocale)
  const activeNovelTr = novel.translations.find(t => t.locale === activeLocale)

  const activeChapters = novel.chapters.map(ch => ({
    id: ch.id,
    order: ch.order,
    title: ch.title,
    translation: ch.translations.find(t => t.locale === activeLocale) ?? null,
  }))

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <Link href={`/${locale}/author/novels/${id}/edit`} className={styles.backLink}>
          ← 返回编辑
        </Link>
        <h1 className={styles.title}>翻译版本管理 · {novel.title}</h1>
      </div>

      {translatedLocales.length === 0 ? (
        <p style={{ color: 'var(--color-text-muted)' }}>尚无翻译版本。请在编辑页面添加翻译。</p>
      ) : (
        <div className={styles.layout}>
          {/* Sidebar */}
          <nav className={styles.sidebar}>
            <p className={styles.sidebarHeading}>语言版本</p>
            {availableLocales.map(l => {
              const tr = novel.translations.find(t => t.locale === l.value)
              if (!tr) return null
              return (
                <Link
                  key={l.value}
                  href={`/${locale}/author/novels/${id}/translations?lang=${l.value}` as any}
                  className={`${styles.sidebarItem} ${activeLocale === l.value ? styles.active : ''} ${tr.status === 'draft' ? styles.draft : tr.status === 'published' ? styles.published : ''}`}
                >
                  {l.label}
                </Link>
              )
            })}
          </nav>

          {/* Main */}
          <main className={styles.main}>
            {activeLocale && activeNovelTr ? (
              <TranslationsReview
                novelId={id}
                targetLocale={activeLocale}
                localeName={activeLang?.label ?? activeLocale}
                novelTitle={activeNovelTr.title}
                novelDesc={activeNovelTr.description}
                novelStatus={activeNovelTr.status}
                chapters={activeChapters}
                isPublished={activeNovelTr.status === 'published'}
              />
            ) : (
              <p className={styles.selectPrompt}>请从左侧选择语言版本</p>
            )}
          </main>
        </div>
      )}
    </div>
  )
}
