import dynamic from 'next/dynamic'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import LocaleSwitcher from '@/components/LocaleSwitcher'

// ssr: false — Clerk's SignedIn/UserButton renders differently on server vs client,
// which causes a hydration mismatch. Loading client-only eliminates the server HTML entirely.
const HeaderAuth = dynamic(() => import('@/components/HeaderAuth'), { ssr: false })

export default async function SiteLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations('nav')

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <Link href="/" className="site-header__logo">
            <span className="site-header__logo-mark" />
            <span>
              <div className="site-header__logo-name">Novel<em>Phere</em></div>
              <div className="site-header__logo-sub">est · mmxxvi</div>
            </span>
          </Link>
          <div className="site-header__auth">
            <LocaleSwitcher />
            <HeaderAuth />
          </div>
        </div>
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <div className="site-footer__inner">
          <span>© 2026 NovelPhere</span>
        </div>
      </footer>
    </>
  )
}
