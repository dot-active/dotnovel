'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import styles from './LocaleSwitcher.module.css'

const LOCALE_META: Record<string, { name: string; flag: string }> = {
  'zh-CN': { name: '简体中文', flag: '🇨🇳' },
  'zh-TW': { name: '繁體中文', flag: '🇹🇼' },
  en: { name: 'English', flag: '🇺🇸' },
  ja: { name: '日本語', flag: '🇯🇵' },
  ko: { name: '한국어', flag: '🇰🇷' },
  es: { name: 'Español', flag: '🇪🇸' },
}

export default function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function select(newLocale: string) {
    router.replace(pathname, { locale: newLocale })
    localStorage.setItem('preferred-locale', newLocale)
    setOpen(false)
  }

  const current = LOCALE_META[locale] ?? LOCALE_META['zh-CN']

  return (
    <div ref={ref} className={styles.wrapper}>
      <button className={styles.trigger} onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span>{current.flag}</span>
        <span className={styles.name}>{current.name}</span>
        <span className={styles.arrow}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <ul className={styles.dropdown} role="menu">
          {routing.locales.map((l) => (
            <li key={l}>
              <button
                role="menuitem"
                className={`${styles.option} ${l === locale ? styles.optionActive : ''}`}
                onClick={() => select(l)}
              >
                <span>{LOCALE_META[l].flag}</span>
                <span>{LOCALE_META[l].name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
