import { cookies } from 'next/headers'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { prisma } from '@/lib/prisma'
import styles from './page.module.css'

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const t = await getTranslations('home')
  const tNovel = await getTranslations('novel')

  const ageVerified = cookies().get('age_verified')?.value === '1'

  const novels = await prisma.novel.findMany({
    where: {
      publishStatus: 'published',
      translations: { some: { locale } },
      ...(ageVerified ? {} : { isAdult: false }),
    },
    include: {
      _count: { select: { chapters: { where: { publishStatus: 'published' } } } },
      translations: {
        where: { locale },
        select: { title: true, description: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>{t('heroTitle')}</h1>
        <p className={styles.heroSubtitle}>{t('heroSubtitle')}</p>
      </section>

      <section>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('allNovels')}</h2>
          <span className={styles.sectionCount}>{t('novelsCount', { count: novels.length })}</span>
        </div>

        {novels.length === 0 ? (
          <p className={styles.empty}>{t('empty')}</p>
        ) : (
          <div className={styles.grid}>
            {novels.map((novel) => {
              const tr = novel.translations[0]
              return (
                <Link key={novel.id} href={`/novels/${novel.id}`} className={styles.card}>
                  <div className={styles.cardCover}>
                    {novel.coverUrl ? (
                      <img src={novel.coverUrl} alt="" className={styles.cardCoverImg} />
                    ) : (
                      <span className={styles.cardCoverText}>{(tr?.title ?? novel.title)[0]}</span>
                    )}
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.cardMeta}>
                      <span className={`${styles.cardStatus} ${styles[`status${novel.status}`]}`}>
                        {tNovel(`status.${novel.status}`)}
                      </span>
                    </div>
                    <h3 className={styles.cardTitle}>{tr?.title ?? novel.title}</h3>
                    <p className={styles.cardAuthor}>{novel.author}</p>
                    <p className={styles.cardDescription}>{tr?.description ?? novel.description}</p>
                    <div className={styles.cardFooter}>
                      <span className={styles.cardChapters}>
                        {tNovel('chapterCount', { count: novel._count.chapters })}
                      </span>
                      <span className={styles.cardLink}>→</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
