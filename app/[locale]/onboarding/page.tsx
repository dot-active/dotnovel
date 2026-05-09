import { redirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { cookies } from 'next/headers'
import OnboardingForm from './_components/OnboardingForm'
import styles from './page.module.css'

export default async function OnboardingPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string }
  searchParams: { returnUrl?: string }
}) {
  setRequestLocale(locale)

  const { userId } = await auth()
  if (!userId) redirect(`/${locale}`)

  // Already confirmed — no need to see onboarding again
  const ageVerified = cookies().get('age_verified')?.value === '1'
  const returnUrl = searchParams.returnUrl ?? `/${locale}`
  if (ageVerified) redirect(returnUrl)

  // Check if already confirmed on another device via Clerk metadata
  const user = await currentUser()
  const alreadyConfirmedViaMetadata = user?.publicMetadata?.isAdult === true

  return (
    <div className={styles.page}>
      <OnboardingForm
        returnUrl={returnUrl}
        alreadyConfirmedViaMetadata={alreadyConfirmedViaMetadata}
      />
    </div>
  )
}
