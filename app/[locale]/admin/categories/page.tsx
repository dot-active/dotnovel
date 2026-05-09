import { setRequestLocale } from 'next-intl/server'
import { prisma } from '@/lib/prisma'
import CategoryForm from './_components/CategoryForm'
import styles from './page.module.css'

export default async function AdminCategoriesPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)

  const categories = await prisma.category.findMany({
    include: { _count: { select: { novels: true } } },
    orderBy: { slug: 'asc' },
  })

  return (
    <div>
      <h1 className={styles.title}>分类管理</h1>

      <div className={styles.layout}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Slug</th>
                <th>小说数</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td className={styles.tdSlug}>{cat.slug}</td>
                  <td>{cat._count.novels}</td>
                  <td>
                    <CategoryForm
                      mode="delete"
                      categoryId={cat.id}
                      disabled={cat._count.novels > 0}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.formBox}>
          <h2 className={styles.formTitle}>新增分类</h2>
          <CategoryForm mode="create" />
        </div>
      </div>
    </div>
  )
}
