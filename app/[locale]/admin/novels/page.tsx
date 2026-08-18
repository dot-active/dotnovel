import { setRequestLocale } from 'next-intl/server'
import { prisma } from '@/lib/prisma'
import NovelAdminRow from './_components/NovelAdminRow'

const PAGE_SIZE = 50

export default async function AdminNovelsPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string }
  searchParams: { page?: string }
}) {
  setRequestLocale(locale)

  const page = Math.max(1, parseInt(searchParams.page ?? '1', 10) || 1)

  const [novels, totalCount] = await Promise.all([
    prisma.novel.findMany({
      include: {
        categories: { include: { category: { select: { slug: true } } } },
        translations: {
          where: { locale: 'zh-CN' },
          select: { title: true },
        },
        _count: { select: { chapters: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    }),
    prisma.novel.count(),
  ])

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

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
      <h1 className="admin-title">小说管理 <span className="admin-count">({totalCount})</span></h1>
      <div className="admin-table-wrap">
        <table className="admin-table">
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

      {totalPages > 1 && (
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', justifyContent: 'center', marginTop: '1rem' }}>
          <a href={`?page=${Math.max(1, page - 1)}`} aria-disabled={page <= 1}>上一页</a>
          <span>第 {page} / {totalPages} 页</span>
          <a href={`?page=${Math.min(totalPages, page + 1)}`} aria-disabled={page >= totalPages}>下一页</a>
        </div>
      )}
    </div>
  )
}
