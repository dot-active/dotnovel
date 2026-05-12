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
            DotNovel
          </Link>
          {/* <nav className="site-header__nav">
            <Link href="/">{t('home')}</Link>
            <a href="#">{t('rankings')}</a>
            <a href="#">{t('categories')}</a>
          </nav> */}
          <div className="site-header__auth">
            <LocaleSwitcher />
            <HeaderAuth />
          </div>
        </div>
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <p>© 2026 DotNovel. All rights reserved.</p>
      </footer>
    </>
  )
}
