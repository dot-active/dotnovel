'use client'

import { useState, useEffect } from 'react'
import { SignedIn, SignedOut, SignInButton, SignUpButton, SignOutButton, UserButton, useAuth } from '@clerk/nextjs'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import logoSrc from '@/src/images/logo.png'

export default function HeaderAuth() {
  const t = useTranslations('nav')
  const [open, setOpen] = useState(false)
  const { isSignedIn } = useAuth()
  const [unreadComments, setUnreadComments] = useState(0)

  useEffect(() => {
    if (!isSignedIn) return
    fetch('/api/comments/unread-count')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setUnreadComments(data.total))
      .catch(() => {})
  }, [isSignedIn])

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <Link href="/" className="site-header__logo">
            <Image src={logoSrc} alt="NovelPhere" height={36} />
          </Link>

          {/* Center nav — hidden on mobile */}
          <nav className="topnav-links">
            <SignedIn>
              <Link href="/novels">{t('novels')}</Link>
              <Link href="/favorites">{t('favorites')}</Link>
            </SignedIn>
            {/* <SignedOut>
              <Link href="/novels">{t('novels')}</Link>
            </SignedOut> */}
          </nav>

          <div className="topnav-right">
            <LocaleSwitcher />

            {/* Desktop-only auth controls */}
            <div className="topnav-desktop-auth">
              <span className="topnav-div" />
              <SignedIn>
                <Link href="/author/dashboard" className="icon-btn" title={t('myWorks')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </Link>
                <span className="icon-btn-wrap">
                  <Link href="/comments" className="icon-btn" title={t('myComments')}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </Link>
                  {unreadComments > 0 && (
                    <span className="icon-badge">{unreadComments > 99 ? '99+' : unreadComments}</span>
                  )}
                </span>
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

            {/* Mobile hamburger */}
            <button
              className="hamburger-btn"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <>
          <div className="mobile-overlay" onClick={() => setOpen(false)} />
          <div className="mobile-drawer">
            {/* Close */}
            <div className="mobile-drawer-head">
              <button
                className="mobile-drawer-close"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Navigation */}
            <nav className="mobile-drawer-nav">
              <Link href="/novels" className="mobile-nav-link" onClick={() => setOpen(false)}>
                {t('novels')}
              </Link>
              <SignedIn>
                <Link href="/favorites" className="mobile-nav-link" onClick={() => setOpen(false)}>
                  {t('favorites')}
                </Link>
                <Link href="/author/dashboard" className="mobile-nav-link" onClick={() => setOpen(false)}>
                  {t('myWorks')}
                </Link>
                <Link href="/comments" className="mobile-nav-link" onClick={() => setOpen(false)}>
                  {t('myComments')}
                  {unreadComments > 0 && (
                    <span className="icon-badge" style={{ position: 'static', marginLeft: 6 }}>
                      {unreadComments > 99 ? '99+' : unreadComments}
                    </span>
                  )}
                </Link>
              </SignedIn>
            </nav>

            {/* Auth */}
            <div className="mobile-drawer-auth">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="mobile-auth-btn mobile-auth-ghost" onClick={() => setOpen(false)}>
                    {t('signIn')}
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="mobile-auth-btn mobile-auth-primary" onClick={() => setOpen(false)}>
                    {t('signUp')}
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <div className="mobile-user-row">
                  <UserButton />
                  <SignOutButton>
                    <button className="mobile-auth-btn mobile-auth-ghost">{t('signOut')}</button>
                  </SignOutButton>
                </div>
              </SignedIn>
            </div>
          </div>
        </>
      )}
    </>
  )
}
