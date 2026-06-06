import { getTranslations, setRequestLocale } from 'next-intl/server'
import styles from './page.module.css'

function TermsSection({ title, body }: { title: string; body: string }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {body.split('\n\n').map((para, i) => (
        <p key={i} className={styles.para}>
          {para}
        </p>
      ))}
    </section>
  )
}

export default async function TermsPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations('termsPage')

  return (
    <article className={styles.article}>
      <header className={styles.hero}>
        <h1 className={styles.heroTitle}>{t('pageTitle')}</h1>
        <p className={styles.lastUpdated}>{t('lastUpdated')}</p>
        <p className={styles.intro}>{t('intro')}</p>
      </header>

      <TermsSection title={t('s1Title')} body={t('s1Body')} />
      <TermsSection title={t('s2Title')} body={t('s2Body')} />
      <TermsSection title={t('s3Title')} body={t('s3Body')} />
      <TermsSection title={t('s4Title')} body={t('s4Body')} />
      <TermsSection title={t('s5Title')} body={t('s5Body')} />
      <TermsSection title={t('s6Title')} body={t('s6Body')} />
      <TermsSection title={t('s7Title')} body={t('s7Body')} />
      <TermsSection title={t('s8Title')} body={t('s8Body')} />
    </article>
  )
}
