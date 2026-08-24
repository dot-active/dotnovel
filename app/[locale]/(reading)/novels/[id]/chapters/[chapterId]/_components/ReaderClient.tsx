'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { Link } from '@/i18n/navigation'
import ParagraphComments from './ParagraphComments'
import ViewTracker from './ViewTracker'
import { injectCardLinks } from '@/lib/injectCardLinks'
import styles from '../page.module.css'

// ── Types ──────────────────────────────────────────────────────────────────

type FontSize = 14 | 16 | 18 | 20 | 24
type Theme = 'light' | 'dark' | 'sepia'

export interface AvailableLocale {
  locale: string
  hasChapter: boolean
}

export interface CardEntryData {
  content: string
}

export interface CardData {
  id: string
  titles: string[]
  entries: CardEntryData[]
  imageUrl: string | null
}

export interface ReaderClientProps {
  locale: string
  novelId: string
  chapterId: string
  novelTitle: string
  chapterTitle: string
  paragraphs: { text: string; commentCount: number }[]
  cards: CardData[]
  userId: string | null
  prevChapter: { id: string; title: string } | null
  nextChapter: { id: string; title: string } | null
  availableLocales: AvailableLocale[]
  tFirstChapter: string
  tLastChapter: string
  tCatalog: string
}

// ── Constants ──────────────────────────────────────────────────────────────

const FONT_SIZES: { labelKey: 'sizeXs' | 'sizeS' | 'sizeM' | 'sizeL' | 'sizeXl'; value: FontSize }[] = [
  { labelKey: 'sizeXs', value: 14 },
  { labelKey: 'sizeS',  value: 16 },
  { labelKey: 'sizeM',  value: 18 },
  { labelKey: 'sizeL',  value: 20 },
  { labelKey: 'sizeXl', value: 24 },
]

const THEMES: { labelKey: 'themeLight' | 'themeDark' | 'themeSepia'; value: Theme; icon: string }[] = [
  { labelKey: 'themeLight', value: 'light', icon: '☀' },
  { labelKey: 'themeDark',  value: 'dark',  icon: '☽' },
  { labelKey: 'themeSepia', value: 'sepia', icon: '◎' },
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
  cards,
  userId,
  prevChapter,
  nextChapter,
  availableLocales,
  tFirstChapter,
  tLastChapter,
  tCatalog,
}: ReaderClientProps) {
  const t = useTranslations('reader')
  const searchParams = useSearchParams()
  const highlightParagraph = searchParams.get('paragraph')
  const [fontSize, setFontSize] = useState<FontSize>(18)
  const [theme, setTheme] = useState<Theme>('sepia')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [hoveredPara, setHoveredPara] = useState<number | null>(null)
  const [activeCardId, setActiveCardId] = useState<string | null>(null)
  const [activeCardTitle, setActiveCardTitle] = useState<string | null>(null)

  const toggleSettings = useCallback(() => setSettingsOpen((v) => !v), [])
  const closeSettings  = useCallback(() => setSettingsOpen(false), [])

  const handleCardClick = useCallback((id: string, title: string) => {
    setActiveCardId(id)
    setActiveCardTitle(title)
    setSettingsOpen(false)
  }, [])

  const closeCard = useCallback(() => setActiveCardId(null), [])

  // ESC key closes the card modal
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && activeCardId) closeCard()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [activeCardId, closeCard])

  // Scroll to and highlight the paragraph referenced by ?paragraph=N (e.g. from /comments links)
  useEffect(() => {
    if (highlightParagraph === null) return
    const el = document.getElementById(`para-${highlightParagraph}`)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    el.classList.add(styles.paraHighlight)
    const timer = setTimeout(() => el.classList.remove(styles.paraHighlight), 2000)
    return () => clearTimeout(timer)
  }, [highlightParagraph])

  const activeCard = activeCardId ? cards.find((c) => c.id === activeCardId) ?? null : null

  // Pre-compute card-injected nodes for all paragraphs.
  // A shared Set ensures each card title is linked only once across the whole chapter.
  // One shared Set per chapter render — each card title links only once
  // across all paragraphs. injectCardLinks mutates the Set as it goes.
  const renderedParagraphs = useMemo(() => {
    const matchedIds = new Set<string>()
    return paragraphs.map((para) => ({
      commentCount: para.commentCount,
      nodes: cards.length > 0
        ? injectCardLinks(para.text, cards, handleCardClick, styles.cardLink, matchedIds)
        : [para.text],
    }))
  }, [paragraphs, cards, handleCardClick])

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
        <button
          className={`${styles.settingsBtn} ${settingsOpen ? styles.settingsBtnActive : ''}`}
          onClick={toggleSettings}
          aria-label={t('settingsAria')}
        >
          <FontAwesomeIcon icon={faGear} />
        </button>
      </header>

      {/* ── Mobile overlay backdrop ── */}
      <div
        className={`${styles.overlay} ${settingsOpen ? styles.overlayVisible : ''}`}
        onClick={closeSettings}
      />

      {/* ── Settings panel ── */}
      <div className={`${styles.settingsPanel} ${settingsOpen ? styles.settingsPanelOpen : ''}`}>
        <div className={styles.settingsSection}>
          <p className={styles.settingsSectionTitle}>{t('fontSizeLabel')}</p>
          <div className={styles.fontSizeOptions}>
            {FONT_SIZES.map(({ labelKey, value }) => (
              <button
                key={value}
                className={`${styles.fontSizeBtn} ${fontSize === value ? styles.fontSizeBtnActive : ''}`}
                onClick={() => setFontSize(value)}
              >
                {t(labelKey)}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.settingsSection}>
          <p className={styles.settingsSectionTitle}>{t('themeModeLabel')}</p>
          <div className={styles.themeOptions}>
            {THEMES.map(({ labelKey, value, icon }) => (
              <button
                key={value}
                className={`${styles.themeBtn} ${theme === value ? styles.themeBtnActive : ''}`}
                onClick={() => setTheme(value)}
              >
                <span className={styles.themeBtnIcon}>{icon}</span>
                {t(labelKey)}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.settingsSection}>
          <p className={styles.settingsSectionTitle}>{t('languageLabel')}</p>
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
                <span key={loc} className={styles.langBtnDisabled} title={t('noChapterTitle')}>
                  {LOCALE_LABELS[loc] ?? loc}
                </span>
              )
            )}
          </div>
          {unavailableLocales.length > 0 && (
            <p className={styles.langUnavailableNote}>
              {t('noChapterNote', { locales: unavailableLocales.join(', ') })}
            </p>
          )}
        </div>
      </div>

      {/* ── Article ── */}
      <article className={styles.article}>
        <h1 className={styles.chapterTitle}>{chapterTitle}</h1>
        <div className={styles.body} style={{ fontSize: `${fontSize}px` }}>
          {renderedParagraphs.map(({ nodes, commentCount }, i) => (
            <div
              key={i}
              id={`para-${i}`}
              className={styles.paraWrapper}
              onMouseEnter={() => setHoveredPara(i)}
              onMouseLeave={() => setHoveredPara(null)}
            >
              <p>
                {nodes}
                <ParagraphComments
                  chapterId={chapterId}
                  paragraphIndex={i}
                  currentUserId={userId}
                  initialCount={commentCount}
                  show={hoveredPara === i}
                  autoOpen={highlightParagraph !== null && Number(highlightParagraph) === i}
                />
              </p>
            </div>
          ))}
        </div>
      </article>

      {/* ── Chapter navigation ── */}
      <nav className={styles.nav}>
        <div className={styles.navSide}>
          {prevChapter ? (
            <Link href={`/novels/${novelId}/chapters/${prevChapter.id}`} className={styles.navBtn}>
              ← {prevChapter.title}
            </Link>
          ) : (
            <span className={styles.navDisabled}>{tFirstChapter}</span>
          )}
        </div>
        <Link href={`/novels/${novelId}`} className={styles.navCatalog}>{tCatalog}</Link>
        <div className={`${styles.navSide} ${styles.navSideRight}`}>
          {nextChapter ? (
            <Link href={`/novels/${novelId}/chapters/${nextChapter.id}`} className={styles.navBtn}>
              {nextChapter.title} →
            </Link>
          ) : (
            <span className={styles.navDisabled}>{tLastChapter}</span>
          )}
        </div>
      </nav>

      {/* ── Card detail modal ── */}
      {activeCard && (
        <div className={styles.cardModalOverlay} onClick={closeCard}>
          <div className={styles.cardModalBox} onClick={(e) => e.stopPropagation()}>
            <button className={styles.cardModalClose} onClick={closeCard} aria-label="关闭">
              ×
            </button>
            {activeCard.imageUrl && (
              <img
                src={activeCard.imageUrl}
                alt={activeCardTitle ?? activeCard.titles[0]}
                className={styles.cardModalImg}
              />
            )}
            <div className={styles.cardModalContent}>
              <h2 className={styles.cardModalTitle}>{activeCardTitle ?? activeCard.titles[0]}</h2>
              {activeCard.titles.filter((title) => title !== activeCardTitle).length > 0 && (
                <p className={styles.cardModalAliases}>
                  {t('aliasesLabel')}
                  {activeCard.titles.filter((title) => title !== activeCardTitle).join(' · ')}
                </p>
              )}
              <div className={styles.cardModalEntries}>
                {activeCard.entries.map((entry, i) => (
                  <p key={i} className={styles.cardModalEntry}>▸ {entry.content}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
