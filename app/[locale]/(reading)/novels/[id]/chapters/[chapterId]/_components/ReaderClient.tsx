'use client'

import { useState, useCallback } from 'react'
import { Link } from '@/i18n/navigation'
import ParagraphComments from './ParagraphComments'
import ViewTracker from './ViewTracker'
import styles from '../page.module.css'

// ── Types ──────────────────────────────────────────────────────────────────

type FontSize = 14 | 16 | 18 | 20 | 24
type Theme = 'light' | 'dark' | 'sepia'

export interface AvailableLocale {
  locale: string
  hasChapter: boolean
}

export interface ReaderClientProps {
  locale: string
  novelId: string
  chapterId: string
  novelTitle: string
  chapterTitle: string
  paragraphs: { text: string; commentCount: number }[]
  userId: string | null
  prevChapter: { id: string; title: string } | null
  nextChapter: { id: string; title: string } | null
  availableLocales: AvailableLocale[]
  tFirstChapter: string
  tLastChapter: string
  tCatalog: string
}

// ── Constants ──────────────────────────────────────────────────────────────

const FONT_SIZES: { label: string; value: FontSize }[] = [
  { label: '特小', value: 14 },
  { label: '小',   value: 16 },
  { label: '中',   value: 18 },
  { label: '大',   value: 20 },
  { label: '特大', value: 24 },
]

const THEMES: { label: string; value: Theme; icon: string }[] = [
  { label: '白天', value: 'light', icon: '☀' },
  { label: '黑夜', value: 'dark',  icon: '☽' },
  { label: '护眼', value: 'sepia', icon: '◎' },
]

const LOCALE_LABELS: Record<string, string> = {
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  'en':    'English',
  'ja':    '日本語',
  'ko':    '한국어',
  'es':    'Español',
}

// ── Component ──────────────────────────────────────────────────────────────

export default function ReaderClient({
  locale,
  novelId,
  chapterId,
  novelTitle,
  chapterTitle,
  paragraphs,
  userId,
  prevChapter,
  nextChapter,
  availableLocales,
  tFirstChapter,
  tLastChapter,
  tCatalog,
}: ReaderClientProps) {
  const [fontSize, setFontSize] = useState<FontSize>(18)
  const [theme, setTheme] = useState<Theme>('light')
  const [settingsOpen, setSettingsOpen] = useState(false)

  const toggleSettings = useCallback(() => setSettingsOpen((v) => !v), [])
  const closeSettings  = useCallback(() => setSettingsOpen(false), [])

  // Show unavailable note if current locale has no chapter translation in target
  const unavailableLocales = availableLocales
    .filter((l) => !l.hasChapter)
    .map((l) => LOCALE_LABELS[l.locale] ?? l.locale)

  return (
    <div className={styles.page} data-theme={theme}>
      <ViewTracker novelId={novelId} />

      {/* ── Top bar ── */}
      <header className={styles.topBar}>
        <Link href={`/novels/${novelId}`} className={styles.backLink}>
          ← {novelTitle}
        </Link>
        <span className={styles.topBarChapter}>{chapterTitle}</span>
        <button
          className={`${styles.settingsBtn} ${settingsOpen ? styles.settingsBtnActive : ''}`}
          onClick={toggleSettings}
          aria-label="阅读设置"
        >
          ⚙
        </button>
      </header>

      {/* ── Mobile overlay backdrop ── */}
      <div
        className={`${styles.overlay} ${settingsOpen ? styles.overlayVisible : ''}`}
        onClick={closeSettings}
      />

      {/* ── Settings panel ── */}
      <div className={`${styles.settingsPanel} ${settingsOpen ? styles.settingsPanelOpen : ''}`}>
        {/* Font size */}
        <div className={styles.settingsSection}>
          <p className={styles.settingsSectionTitle}>字体大小</p>
          <div className={styles.fontSizeOptions}>
            {FONT_SIZES.map(({ label, value }) => (
              <button
                key={value}
                className={`${styles.fontSizeBtn} ${fontSize === value ? styles.fontSizeBtnActive : ''}`}
                onClick={() => setFontSize(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Theme */}
        <div className={styles.settingsSection}>
          <p className={styles.settingsSectionTitle}>阅读模式</p>
          <div className={styles.themeOptions}>
            {THEMES.map(({ label, value, icon }) => (
              <button
                key={value}
                className={`${styles.themeBtn} ${theme === value ? styles.themeBtnActive : ''}`}
                onClick={() => setTheme(value)}
              >
                <span className={styles.themeBtnIcon}>{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div className={styles.settingsSection}>
          <p className={styles.settingsSectionTitle}>语言</p>
          <div className={styles.langOptions}>
            {availableLocales.map(({ locale: loc, hasChapter }) =>
              hasChapter ? (
                <a
                  key={loc}
                  href={`/${loc}/novels/${novelId}/chapters/${chapterId}`}
                  className={`${styles.langBtn} ${loc === locale ? styles.langBtnActive : ''}`}
                >
                  {LOCALE_LABELS[loc] ?? loc}
                </a>
              ) : (
                <span key={loc} className={styles.langBtnDisabled} title="该章节暂无此语言版本">
                  {LOCALE_LABELS[loc] ?? loc}
                </span>
              )
            )}
          </div>
          {unavailableLocales.length > 0 && (
            <p className={styles.langUnavailableNote}>
              * {unavailableLocales.join('、')} 暂无此章节译文
            </p>
          )}
        </div>
      </div>

      {/* ── Article ── */}
      <article className={styles.article}>
        <h1 className={styles.chapterTitle}>{chapterTitle}</h1>
        <div className={styles.body} style={{ fontSize: `${fontSize}px` }}>
          {paragraphs.map(({ text, commentCount }, i) => (
            <div key={i} className={styles.paraWrapper}>
              <p>{text}</p>
              <ParagraphComments
                chapterId={chapterId}
                paragraphIndex={i}
                currentUserId={userId}
                initialCount={commentCount}
              />
            </div>
          ))}
        </div>
      </article>

      {/* ── Chapter navigation ── */}
      <nav className={styles.nav}>
        <div className={styles.navSide}>
          {prevChapter ? (
            <Link
              href={`/novels/${novelId}/chapters/${prevChapter.id}`}
              className={styles.navBtn}
            >
              ← {prevChapter.title}
            </Link>
          ) : (
            <span className={styles.navDisabled}>{tFirstChapter}</span>
          )}
        </div>

        <Link href={`/novels/${novelId}`} className={styles.navCatalog}>
          {tCatalog}
        </Link>

        <div className={`${styles.navSide} ${styles.navSideRight}`}>
          {nextChapter ? (
            <Link
              href={`/novels/${novelId}/chapters/${nextChapter.id}`}
              className={styles.navBtn}
            >
              {nextChapter.title} →
            </Link>
          ) : (
            <span className={styles.navDisabled}>{tLastChapter}</span>
          )}
        </div>
      </nav>
    </div>
  )
}
