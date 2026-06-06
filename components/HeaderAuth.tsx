'use client'

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import logoSrc from '@/src/images/logo.png'

export default function HeaderAuth() {
  const t = useTranslations('nav')

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__logo">
          <Image src={logoSrc} alt="NovelPhere" height={36} />
        </Link>

        <nav className="topnav-links">
          <SignedIn>
            <Link href="/novels">{t('novels')}</Link>
            <Link href="/favorites">{t('favorites')}</Link>
          </SignedIn>
          <SignedOut>
            <Link href="/novels">{t('novels')}</Link>
          </SignedOut>
        </nav>

        <div className="topnav-right">
          <LocaleSwitcher />
          <span className="topnav-div" />
          <SignedIn>
            <Link href="/author/dashboard" className="icon-btn" title={t('myWorks')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </Link>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn-ghost">{t('signIn')}</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="btn-primary-sm">{t('signUp')}</button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}
