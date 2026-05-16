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
  total: number
}

const SORT_KEYS = [
  { key: '', labelKey: 'sortUpdated' },
  { key: 'views', labelKey: 'sortViews' },
  { key: 'favorites', labelKey: 'sortFavorites' },
] as const

export default function FilterBar({ categories, currentCategories, currentSort, currentQ, total }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('home')
  const tCat = useTranslations('categories')
  const [searchInput, setSearchInput] = useState(currentQ)

  function buildUrl(q: string, cats: string[], sort: string) {
    const sp = new URLSearchParams()
    if (q) sp.set('q', q)
    if (cats.length > 0) sp.set('category', cats.join(','))
    if (sort) sp.set('sort', sort)
    const qs = sp.toString()
    return qs ? `${pathname}?${qs}` : pathname
  }

  function toggleCategory(slug: string) {
    const newCats = currentCategories.includes(slug)
      ? currentCategories.filter((s) => s !== slug)
      : [...currentCategories, slug]
    router.push(buildUrl(currentQ, newCats, currentSort))
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    router.push(buildUrl(searchInput.trim(), currentCategories, currentSort))
  }

  function setSort(sort: string) {
    router.push(buildUrl(currentQ, currentCategories, sort))
  }

  return (
    <div>
      {/* Filters: chips + search */}
      <div className={styles.filters}>
        <div className={styles.filtersGroup}>
          <button
            className={`${styles.chip} ${currentCategories.length === 0 ? styles.chipActive : ''}`}
            onClick={() => router.push(buildUrl(currentQ, [], currentSort))}
          >
            {t('all')}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.chip} ${currentCategories.includes(cat.slug) ? styles.chipActive : ''}`}
              onClick={() => toggleCategory(cat.slug)}
            >
              {tCat(cat.slug as Parameters<typeof tCat>[0])}
            </button>
          ))}
        </div>

      </div>

      {/* Sort row */}
      <div className={styles.sortRow}>
        <span className={styles.eyebrow}>{t('sortLabel')}</span>
        {SORT_KEYS.map((s) => (
          <button
            key={s.key}
            className={`${styles.sort} ${currentSort === s.key ? styles.sortActive : ''}`}
            onClick={() => setSort(s.key)}
          >
            {t(s.labelKey)}
          </button>
        ))}
                <form onSubmit={handleSearch} className={styles.filtersSearch}>
          <span className={styles.searchIcon}>⌕</span>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className={styles.searchInput}
          />
        </form>
      </div>
    </div>
  )
}
