import Link from 'next/link'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import styles from './page.module.css'

async function removeFavorite(formData: FormData) {
  'use server'
  const novelId = formData.get('novelId') as string
  const locale = formData.get('locale') as string
  const { userId } = await auth()
  if (!userId) return
  await prisma.favorite.deleteMany({ where: { userId, novelId } })
  revalidatePath(`/${locale}/favorites`)
}

export default async function FavoritesPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations('favorites')
  const tNovel = await getTranslations('novel')

  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: {
      novel: {
        include: {
          _count: { select: { chapters: { where: { publishStatus: 'published' } } } },
          translations: {
            where: { locale },
            select: { title: true },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('total', { count: favorites.length })}</p>
      </div>

      {favorites.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>{t('empty')}</p>
          <Link href="/" className={styles.browseBtn}>
            {t('browseNovels')}
          </Link>
        </div>
      ) : (
        <ul className={styles.list}>
          {favorites.map((fav) => {
            const tr = fav.novel.translations[0]
            return (
              <li key={fav.id} className={styles.item}>
                <div className={styles.itemCover}>
                  <span>{(tr?.title ?? fav.novel.title)[0]}</span>
                </div>
                <div className={styles.itemBody}>
                  <Link href={`/novels/${fav.novel.id}`} className={styles.itemTitle}>
                    {tr?.title ?? fav.novel.title}
                  </Link>
                  <p className={styles.itemAuthor}>{fav.novel.author}</p>
                  <div className={styles.itemMeta}>
                    <span className={styles.itemChapters}>
                      {tNovel('chapterCount', { count: fav.novel._count.chapters })}
                    </span>
                    <span className={`${styles.statusTag} ${styles[`status${fav.novel.status}`]}`}>
                      {tNovel(`status.${fav.novel.status}`)}
                    </span>
                  </div>
                </div>
                <form action={removeFavorite}>
                  <input type="hidden" name="novelId" value={fav.novel.id} />
                  <input type="hidden" name="locale" value={locale} />
                  <button type="submit" className={styles.removeBtn}>
                    {t('remove')}
                  </button>
                </form>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
