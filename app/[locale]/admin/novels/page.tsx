import { setRequestLocale } from 'next-intl/server'
import { prisma } from '@/lib/prisma'
import NovelAdminRow from './_components/NovelAdminRow'
import styles from './page.module.css'

export default async function AdminNovelsPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)

  const novels = await prisma.novel.findMany({
    include: {
      categories: { include: { category: { select: { slug: true } } } },
      translations: {
        where: { locale: 'zh-CN' },
        select: { title: true },
      },
      _count: { select: { chapters: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  const rows = novels.map((n) => ({
    id: n.id,
    title: n.translations[0]?.title ?? n.title,
    categorySlugs: n.categories.map((c) => c.category.slug),
    sourceLocale: n.sourceLocale,
    isAdult: n.isAdult,
    isFeatured: n.isFeatured,
    publishStatus: n.publishStatus,
    chapterCount: n._count.chapters,
    viewCount: n.viewCount,
    favoriteCount: n.favoriteCount,
  }))

  return (
    <div>
      <h1 className={styles.title}>小说管理 <span className={styles.count}>({rows.length})</span></h1>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>标题</th>
              <th>分类（多选）</th>
              <th>语言</th>
              <th>章节</th>
              <th>18+</th>
              <th>状态</th>
              <th>点击</th>
              <th>收藏</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <NovelAdminRow key={row.id} novel={row} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
