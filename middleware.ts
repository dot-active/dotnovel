import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import createIntlMiddleware from 'next-intl/middleware'
import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server'
import { routing } from './i18n/routing'
import { isBlockedBot } from './lib/blockedBots'

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

const handler = clerkMiddleware(async (auth, req) => {
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

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  // Turn away AI/SEO scrapers at the edge, before any page render touches the
  // database. robots.txt stays reachable so they can read the disallow rule.
  if (req.nextUrl.pathname !== '/robots.txt' && isBlockedBot(req.headers.get('user-agent'))) {
    return new NextResponse(null, { status: 403 })
  }
  return handler(req, event)
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
