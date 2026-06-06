import dynamic from 'next/dynamic'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

const HeaderAuth = dynamic(() => import('@/components/HeaderAuth'), { ssr: false })

export default async function SiteLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  setRequestLocale(locale)
  const tf = await getTranslations('footer')

  return (
    <>
      <HeaderAuth />
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <div className="site-footer__inner">
          <span>© 2026 NovelPhere</span>
          <nav className="site-footer__nav">
            <Link href="/about">{tf('about')}</Link>
            <Link href="/terms">{tf('terms')}</Link>
            <Link href="/contact">{tf('contact')}</Link>
          </nav>
        </div>
      </footer>
    </>
  )
}
