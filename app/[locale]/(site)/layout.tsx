import dynamic from 'next/dynamic'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import logoSrc from '@/src/images/logo.png'

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
  const tf = await getTranslations('footer')

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <Link href="/" className="site-header__logo">
            <Image src={logoSrc} alt="NovelPhere" height={36} />
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
