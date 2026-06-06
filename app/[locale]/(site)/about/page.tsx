import { getTranslations, setRequestLocale } from 'next-intl/server'
import styles from './page.module.css'

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations('aboutPage')

  return (
    <article className={styles.article}>
      <header className={styles.hero}>
        <h1 className={styles.heroTitle}>{t('pageTitle')}</h1>
        <p className={styles.introPara}>{t('introPara')}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('missionTitle')}</h2>
        <p className={styles.para}>{t('missionPara')}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('featuresTitle')}</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>{t('feature1Title')}</h3>
            <p className={styles.featureDesc}>{t('feature1Desc')}</p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>{t('feature2Title')}</h3>
            <p className={styles.featureDesc}>{t('feature2Desc')}</p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>{t('feature3Title')}</h3>
            <p className={styles.featureDesc}>{t('feature3Desc')}</p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>{t('feature4Title')}</h3>
            <p className={styles.featureDesc}>{t('feature4Desc')}</p>
          </div>
        </div>
      </section>

      <div className={styles.promiseRow}>
        <section className={styles.promiseCard}>
          <h2 className={styles.promiseTitle}>{t('authorsTitle')}</h2>
          <p className={styles.para}>{t('authorsPara')}</p>
        </section>
        <section className={styles.promiseCard}>
          <h2 className={styles.promiseTitle}>{t('readersTitle')}</h2>
          <p className={styles.para}>{t('readersPara')}</p>
        </section>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('contactTitle')}</h2>
        <p className={styles.para}>{t('contactPara')}</p>
        <a href={`mailto:${t('contactEmail')}`} className={styles.contactEmail}>
          {t('contactEmail')}
        </a>
      </section>
    </article>
  )
}
