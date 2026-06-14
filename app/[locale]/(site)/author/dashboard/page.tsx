import { auth } from '@clerk/nextjs/server'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { prisma } from '@/lib/prisma'
import PublishAllDraftsButton from './_components/PublishAllDraftsButton'
import styles from './page.module.css'

export default async function AuthorDashboardPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations('author')
  const { userId } = await auth()

  const novels = await prisma.novel.findMany({
    where: { authorId: userId! },
    include: {
      chapters: { select: { publishStatus: true, id: true } },
      translations: { where: { locale }, select: { title: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  const novelIds = novels.map((n) => n.id)

  // draft ChapterTranslation counts per chapter (any language)
  const draftCtGroups = await prisma.chapterTranslation.groupBy({
    by: ['chapterId'],
    where: { status: 'draft', chapter: { novelId: { in: novelIds } } },
    _count: { id: true },
  })

  // unread comment counts per novel
  const unreadGroups = await prisma.comment.groupBy({
    by: ['chapterId'],
    where: {
      chapter: { novelId: { in: novelIds } },
      isReadByAuthor: false,
      isDeleted: false,
    },
    _count: { id: true },
  })

  // map chapterId → novelId
  const chapterNovelMap: Record<string, string> = {}
  novels.forEach((n) => n.chapters.forEach((c) => { chapterNovelMap[c.id] = n.id }))

  const unreadByNovel: Record<string, number> = {}
  unreadGroups.forEach((g) => {
    const nid = chapterNovelMap[g.chapterId]
    if (nid) unreadByNovel[nid] = (unreadByNovel[nid] ?? 0) + g._count.id
  })

  const draftTranslationCountByNovel: Record<string, number> = {}
  draftCtGroups.forEach((g) => {
    const nid = chapterNovelMap[g.chapterId]
    if (nid) draftTranslationCountByNovel[nid] = (draftTranslationCountByNovel[nid] ?? 0) + g._count.id
  })

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>{t('myNovels')}</h1>
          {/* <p className={styles.subtitle}>{t('dashboard')}</p> */}
        </div>
        <Link href="/author/novels/new" className={styles.createBtn}>
          + {t('createNovel')}
        </Link>
      </div>

      {novels.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>{t('noNovels')}</p>
          <Link href="/author/novels/new" className={styles.emptyBtn}>
            {t('startWriting')}
          </Link>
        </div>
      ) : (
        <div className={styles.table}>
          {/* <div className={styles.tableHeader}>
            <span>小说</span>
            <span>章节</span>
            <span>发布时间</span>
            <span>操作</span>
          </div> */}
          {novels.map((novel) => {
            const tr = novel.translations[0]
            const publishedCount = novel.chapters.filter((c) => c.publishStatus === 'published').length
            const draftCount = draftTranslationCountByNovel[novel.id] ?? 0
            const unread = unreadByNovel[novel.id] ?? 0
            return (
              <div key={novel.id} className={styles.tableRow}>
                <div className={styles.novelInfo}>
                  {novel.coverUrl ? (
                    <img src={novel.coverUrl} alt="" className={styles.coverThumb} />
                  ) : (
                    <div className={styles.coverPlaceholder}>
                      {(tr?.title ?? novel.title)[0]}
                    </div>
                  )}
                  <div>
                    <Link
                      href={`/author/novels/${novel.id}/chapters`}
                      className={styles.novelTitleLink}
                    >
                      {tr?.title ?? novel.title}
                    </Link>
                    <p className={styles.novelAuthor}>{t('novelCount', { count: publishedCount })}</p>
                  </div>
                </div>
 
                <div className={styles.actions}>
                  {/* {hasDraftTranslation.has(novel.id) && (
                    <Link
                      href={`/author/novels/${novel.id}/edit?lang=${draftLocaleMap[novel.id] ?? ''}`}
                      className={`${styles.actionBtn} ${styles.actionBtnDraft}`}
                    >
                      有新翻译草稿待审阅
                    </Link>
                  )} */}
                  {draftCount > 0 && (
                    <div  className={styles.btnContainer}>
                      <PublishAllDraftsButton novelId={novel.id} />
                      <div className={styles.unreadBadge}>{draftCount}</div>
                    </div>
                  )}
                  <Link
                    href={`/author/novels/${novel.id}/comments`}
                    className={styles.actionBtn}
                  >
                    {t('manageComments')}
                    {unread > 0 && (
                      <div className={styles.unreadBadge}>
                        {unread > 99 ? '99+' : unread}
                      </div>
                    )}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
