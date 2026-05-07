'use client'

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function HeaderAuth() {
  const t = useTranslations('nav')

  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="btn-ghost">{t('signIn')}</button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="btn-primary-sm">{t('signUp')}</button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <Link href="/favorites" className="site-header__nav-link">
          {t('favorites')}
        </Link>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </>
  )
}
