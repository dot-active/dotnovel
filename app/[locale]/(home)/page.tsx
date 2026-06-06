import { cookies } from 'next/headers'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { prisma } from '@/lib/prisma'
import { formatCount } from '@/lib/formatCount'
import styles from './page.module.css'

const LOCALE_FLAGS: Record<string, string> = {
  'zh-CN': '🇨🇳', 'zh-TW': '🇹🇼', en: '🇺🇸', ja: '🇯🇵', ko: '🇰🇷', es: '🇪🇸',
}

const COVER_CLASSES = [
  'cvDark', 'cvTerra', 'cvOlive', 'cvBlue', 'cvClay', 'cvInk', 'cvPlum', 'cvSage',
] as const

function getFlags(locales: string[]): string {
  return locales.map((l) => LOCALE_FLAGS[l] ?? '').filter(Boolean).join(' ')
}

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations('home')

  const ageVerified = cookies().get('age_verified')?.value === '1'
  const adultFilter = ageVerified ? {} : { isAdult: false as const }

  const [featuredNovels, trendingNovels] = await Promise.all([
    prisma.novel.findMany({
      where: { isFeatured: true, publishStatus: 'published', ...adultFilter },
      select: {
        id: true,
        title: true,
        author: true,
        coverUrl: true,
        translations: {
          where: { status: 'published' },
          select: { locale: true, title: true, description: true },
        },
      },
      orderBy: { updatedAt: 'desc' },
    }),
    prisma.novel.findMany({
      where: { publishStatus: 'published', ...adultFilter },
      select: {
        id: true,
        title: true,
        author: true,
        viewCount: true,
        updatedAt: true,
        translations: {
          where: { status: 'published' },
          select: { locale: true, title: true },
        },
      },
      orderBy: { viewCount: 'desc' },
      take: 8,
    }),
  ])

  return (
    <>

      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.container}>
        <div className={styles.heroLeft}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            {t('eyebrow')}
          </div>
          <h1 className={styles.headline}>
            <span className={styles.line1}>{t('landingLine1')}</span>
            <em className={styles.line2}>{t('landingLine2')}</em>
          </h1>
          <p className={styles.sub}>{t('landingSub')}</p>
          <div className={styles.ctas}>
            <Link href="/novels" className={styles.ctaPrimary}>
              {t('ctaRead')} <span className={styles.arr}>→</span>
            </Link>
            <Link href="/author/novels/new" className={styles.ctaSecondary}>
              {t('ctaPublish')}
            </Link>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.transCard}>
            <div className={styles.transHead}>
              <span className={`${styles.tcDot} ${styles.tcDotAccent}`} />
              <span className={styles.tcDot} />
              <span className={styles.tcDot} />
              <span className={styles.tcTitle}>Claude Opus 4.6</span>
            </div>
            <div className={styles.transSource}>
              <div className={styles.tsLabel}>🇨🇳 中文 · 原文</div>
              <div className={styles.tsText}>她推开门，看见了整片星海。</div>
            </div>
            <div className={styles.transLines}>
              <div className={`${styles.tl} ${styles.tlEn}`}>
                <span className={styles.tlFlag}>🇺🇸</span>
                <span className={styles.tlText}>She opened the door to an ocean of stars.</span>
                <span className={styles.tlLang}>EN</span>
              </div>
              <div className={`${styles.tl} ${styles.tlJa}`}>
                <span className={styles.tlFlag}>🇯🇵</span>
                <span className={styles.tlText}>扉を開けると、一面の星の海が広がっていた。</span>
                <span className={styles.tlLang}>JA</span>
              </div>
              <div className={`${styles.tl} ${styles.tlEs}`}>
                <span className={styles.tlFlag}>🇪🇸</span>
                <span className={styles.tlText}>Abrió la puerta a un océano de estrellas.</span>
                <span className={styles.tlLang}>ES</span>
              </div>
              <div className={styles.tl}>
                <span className={styles.tlFlag}>🇰🇷</span>
                <span className={styles.tlText}>문을 열자, 온통 별의 바다가 펼쳐져 있었다。</span>
                <span className={styles.tlLang}>KO</span>
              </div>
            </div>
            <div className={styles.transCardFoot}>
              <span className={styles.aiBadge}>
                <span className={styles.aiDot} />
                AI 翻译中
              </span>
              <span className={styles.moreLangs}>5 种语言</span>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ===== FEATURED ===== */}
      {featuredNovels.length > 0 && (
        <section className={styles.section}>
          <div className={styles.container}>
          <div className={styles.secHead}>
            <div>
              <div className={styles.secKicker}>{t('featuredKicker')}</div>
              <h2 className={styles.secTitle}>{t('featuredNovels')}</h2>
              <p className={styles.secSub}>{t('featuredSub')}</p>
            </div>
            <Link href="/novels" className={styles.secLink}>{t('featuredBrowse')}</Link>
          </div>
          <div className={styles.featGrid}>
            {featuredNovels.map((novel, i) => {
              const tr = novel.translations.find((t) => t.locale === locale)
                ?? novel.translations[0]
              const coverClass = COVER_CLASSES[i % COVER_CLASSES.length]
              const locales = novel.translations.map((t) => t.locale)
              const flags = getFlags(locales)
              return (
                <Link key={novel.id} href={`/novels/${novel.id}`} className={styles.fcard}>
                  <div className={`${styles.fcardCover} ${styles[coverClass]}`}>
                    {novel.coverUrl
                      ? <img src={novel.coverUrl} alt="" className={styles.fcardCoverImg} />
                      : (tr?.title ?? novel.title).slice(0, 6)
                    }
                  </div>
                  <div className={styles.fcardBody}>
                    <h3 className={styles.fcardTitle}>{tr?.title ?? novel.title}</h3>
                    <p className={styles.fcardAuthor}>{novel.author}</p>
                    {tr?.description && (
                      <p className={styles.fcardBlurb}>{tr.description}</p>
                    )}
                    <div className={styles.langTag}>
                      {flags && <span className={styles.langFlags}>{flags}</span>}
                      <span className={styles.langMeta}>
                        <span className={styles.langCap}>{t('translatedIn')}</span>
                        <b className={styles.langCount}>{t('langCount', { count: locales.length })}</b>
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
          </div>
        </section>
      )}

      {/* ===== TRENDING ===== */}
      {trendingNovels.length > 0 && (
        <section className={styles.section}>
          <div className={styles.container}>
          <div className={styles.secHead}>
            <div>
              <div className={styles.secKicker}>{t('trendingKicker')}</div>
              <h2 className={styles.secTitle}>{t('trendingTitle')}</h2>
              <p className={styles.secSub}>{t('trendingSub')}</p>
            </div>
            <Link href="/novels?sort=views" className={styles.secLink}>{t('trendingBrowse')}</Link>
          </div>
          <div className={styles.rankWrap}>
            {trendingNovels.map((novel, i) => {
              const tr = novel.translations.find((t) => t.locale === locale)
                ?? novel.translations[0]
              const locales = novel.translations.map((t) => t.locale)
              const flags = getFlags(locales)
              return (
                <Link key={novel.id} href={`/novels/${novel.id}`} className={styles.rankRow}>
                  <span className={`${styles.rankNum} ${i < 3 ? styles.rankNumTop : ''}`}>
                    {i + 1}
                  </span>
                  <div className={styles.rankMain}>
                    <span className={styles.rankTitle}>{tr?.title ?? novel.title}</span>
                    <span className={styles.rankAuthor}>{novel.author}</span>
                  </div>
                  <div className={styles.rankSide}>
                    {flags && <span className={styles.rankLangs}>{flags}</span>}
                    <span className={styles.rankViews}>{formatCount(novel.viewCount)} 阅</span>
                  </div>
                </Link>
              )
            })}
          </div>
          </div>
        </section>
      )}

      {/* ===== RECRUIT ===== */}
      <div className={styles.recruit}>
        <div className={`${styles.recruitInner} ${styles.container}`}>
          <div className={styles.recruitCopy}>
            <div className={styles.recruitKicker}>{t('recruitKicker')}</div>
            <h2 className={styles.recruitTitle}>{t('recruitTitle')}</h2>
            <div className={styles.recruitFlow}>
              <span className={styles.flowStep}>
                <span className={styles.flowIc}>✍️</span>
                {t('flowStep1')}
              </span>
              <span className={styles.flowArrow}>→</span>
              <span className={styles.flowStep}>
                <span className={styles.flowIc}>🌐</span>
                {t('flowStep2')}
              </span>
              <span className={styles.flowArrow}>→</span>
              <span className={styles.flowStep}>
                <span className={styles.flowIc}>📖</span>
                {t('flowStep3')}
              </span>
            </div>
          </div>
          <Link href="/author/novels/new" className={styles.recruitBtn}>
            {t('recruitCta')} <span className={styles.arr}>→</span>
          </Link>
        </div>
      </div>

    </>
  )
}
