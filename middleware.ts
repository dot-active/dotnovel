import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import createIntlMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createIntlMiddleware(routing)

const localePattern = routing.locales.join('|')

// All routes that require authentication
const isProtectedRoute = createRouteMatcher([
  `/(${localePattern})/favorites(.*)`,
  `/(${localePattern})/author(.*)`,
  `/(${localePattern})/onboarding(.*)`,
  `/(${localePattern})/admin(.*)`,
  `/(${localePattern})/comments(.*)`,
  `/(${localePattern})/profile(.*)`,
])

// Only author/* and favorites/* trigger the onboarding redirect
// Admin users skip onboarding enforcement (they may not have completed it)
const isOnboardingCheckRoute = createRouteMatcher([
  `/(${localePattern})/favorites(.*)`,
  `/(${localePattern})/author(.*)`,
])

const isOnboardingRoute = new RegExp(`^/(${localePattern})/onboarding`)

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()
  const pathname = req.nextUrl.pathname

  // Redirect authenticated users who haven't done onboarding when accessing
  // author/* or favorites/* — but not the onboarding page itself.
  if (userId && !isOnboardingRoute.test(pathname) && isOnboardingCheckRoute(req)) {
    const onboardingDone = req.cookies.get('onboarding_done')?.value === '1'
    if (!onboardingDone) {
      const locale =
        routing.locales.find((l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`) ??
        routing.defaultLocale
      return NextResponse.redirect(new URL(`/${locale}/onboarding`, req.url))
    }
  }

  if (isProtectedRoute(req)) auth.protect()

  // Skip locale routing for API routes and the well-known root-level files
  // (app/sitemap.ts, app/robots.ts) — these must be served at their exact
  // unprefixed path, not redirected to /<locale>/sitemap.xml (which 404s).
  if (
    pathname.startsWith('/api/') ||
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt'
  ) {
    return NextResponse.next()
  }

  return intlMiddleware(req)
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
