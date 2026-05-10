'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import styles from './FilterBar.module.css'

interface Category {
  id: string
  slug: string
}

interface Props {
  categories: Category[]
  currentCategories: string[]
  currentSort: string
  currentQ: string
}

const SORT_OPTIONS = [
  { key: '', label: '最近更新' },
  { key: 'views', label: '最多人看' },
  { key: 'favorites', label: '最多收藏' },
]

export default function FilterBar({ categories, currentCategories, currentSort, currentQ }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const tCat = useTranslations('categories')
  const [searchInput, setSearchInput] = useState(currentQ)

  function buildUrl(q: string, cats: string[], sort: string, page = 1) {
    const sp = new URLSearchParams()
    if (q) sp.set('q', q)
    if (cats.length > 0) sp.set('category', cats.join(','))
    if (sort) sp.set('sort', sort)
    if (page > 1) sp.set('page', String(page))
    const qs = sp.toString()
    return qs ? `${pathname}?${qs}` : pathname
  }

  function toggleCategory(slug: string) {
    const newCats = currentCategories.includes(slug)
      ? currentCategories.filter((s) => s !== slug)
      : [...currentCategories, slug]
    router.push(buildUrl(currentQ, newCats, currentSort))
  }

  function clearCategories() {
    router.push(buildUrl(currentQ, [], currentSort))
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    router.push(buildUrl(searchInput.trim(), currentCategories, currentSort))
  }

  function setSort(sort: string) {
    router.push(buildUrl(currentQ, currentCategories, sort))
  }

  return (
    <div className={styles.root}>
      {/* Search row */}
      <form onSubmit={handleSearch} className={styles.searchRow}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="搜索小说名、作者…"
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchBtn}>搜索</button>
        {currentQ && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={() => {
              setSearchInput('')
              router.push(buildUrl('', currentCategories, currentSort))
            }}
          >
            清除
          </button>
        )}
      </form>

      {/* Category tags row */}
      <div className={styles.tagsRow}>
        <button
          className={`${styles.tag} ${currentCategories.length === 0 ? styles.tagActive : ''}`}
          onClick={clearCategories}
        >
          全部
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.tag} ${currentCategories.includes(cat.slug) ? styles.tagActive : ''}`}
            onClick={() => toggleCategory(cat.slug)}
          >
            {tCat(cat.slug as Parameters<typeof tCat>[0])}
          </button>
        ))}
      </div>

      {/* Sort row */}
      <div className={styles.sortRow}>
        <span className={styles.sortLabel}>排序：</span>
        {SORT_OPTIONS.map((s) => (
          <button
            key={s.key}
            className={`${styles.sortBtn} ${currentSort === s.key ? styles.sortBtnActive : ''}`}
            onClick={() => setSort(s.key)}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}
