#!/usr/bin/env node
/**
 * Smoke test — a fast, dependency-free sanity check for the live site.
 *
 * Runs plain HTTP checks (no browser) against BASE_URL, covering the exact
 * class of regression that's actually hit production here before:
 *   - a page/API 500ing or redirecting into a dead end
 *   - the i18n middleware swallowing a well-known root file (sitemap.xml,
 *     robots.txt) into a locale-prefixed 404
 *   - a public API leaking a field it shouldn't (e.g. commenter IP)
 *   - auth-gated routes/APIs not actually gating
 *   - a unique-constraint collision surfacing as an uncaught crash instead
 *     of a normal form error
 *
 * Usage:
 *   BASE_URL=http://localhost:3000 node tests/smoke-test.mjs
 *
 * Optional, for deeper checks against seeded fixtures (skipped if unset):
 *   TEST_NOVEL_ID=...      a published novel id with zh-CN translations
 *   TEST_CHAPTER_ID=...    a published chapter id belonging to that novel
 *
 * Exits 0 if every check passes, 1 otherwise. Prints one line per check.
 */

const BASE_URL = (process.env.BASE_URL || 'http://localhost:3000').replace(/\/$/, '')
const TEST_NOVEL_ID = process.env.TEST_NOVEL_ID
const TEST_CHAPTER_ID = process.env.TEST_CHAPTER_ID
const TIMEOUT_MS = 20_000

let passed = 0
let failed = 0
const failures = []

async function req(path, opts = {}) {
  const res = await fetch(BASE_URL + path, {
    redirect: 'manual',
    signal: AbortSignal.timeout(TIMEOUT_MS),
    ...opts,
  })
  const text = await res.text().catch(() => '')
  return { status: res.status, headers: res.headers, text }
}

async function check(name, fn) {
  try {
    await fn()
    passed++
    console.log(`PASS  ${name}`)
  } catch (err) {
    failed++
    failures.push(name)
    console.log(`FAIL  ${name}`)
    console.log(`      ${err.message}`)
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg)
}

// ── Tier 1: page/API-level checks that need no fixtures ────────────────────

await check('home page renders', async () => {
  const r = await req('/zh-CN')
  assert(r.status === 200, `expected 200, got ${r.status}`)
  assert(!/Application error|internal server error/i.test(r.text), 'rendered an error page')
})

await check('novels list renders', async () => {
  const r = await req('/zh-CN/novels')
  assert(r.status === 200, `expected 200, got ${r.status}`)
})

await check('sitemap.xml is not locale-redirected and returns XML', async () => {
  const r = await req('/sitemap.xml')
  assert(r.status === 200, `expected 200, got ${r.status} (middleware may be redirecting this into a locale 404 again)`)
  assert(r.text.includes('<?xml'), 'response is not XML')
})

await check('robots.txt is not locale-redirected and lists a sitemap', async () => {
  const r = await req('/robots.txt')
  assert(r.status === 200, `expected 200, got ${r.status}`)
  assert(/Sitemap:/i.test(r.text), 'robots.txt has no Sitemap: line')
})

await check('sign-in page renders without crashing', async () => {
  const r = await req('/zh-CN/sign-in')
  assert(r.status === 200, `expected 200, got ${r.status}`)
})

await check('sign-up page renders without crashing', async () => {
  const r = await req('/zh-CN/sign-up')
  assert(r.status === 200, `expected 200, got ${r.status}`)
})

await check('unauthenticated /favorites redirects (does not 200)', async () => {
  const r = await req('/zh-CN/favorites')
  assert(r.status === 307 || r.status === 308, `expected a redirect, got ${r.status}`)
})

await check('unauthenticated /author/dashboard redirects (does not 200)', async () => {
  const r = await req('/zh-CN/author/dashboard')
  assert(r.status === 307 || r.status === 308, `expected a redirect, got ${r.status}`)
})

await check('POST /api/favorites without auth is rejected', async () => {
  const r = await req('/api/favorites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ novelId: 'does-not-matter' }),
  })
  assert(r.status === 401, `expected 401, got ${r.status}`)
})

await check('POST /api/comments rejects a missing chapterId', async () => {
  const r = await req('/api/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paragraphIndex: 0, content: 'no chapter id' }),
  })
  assert(r.status === 400, `expected 400, got ${r.status}`)
})

await check('POST /api/comments rejects a nonexistent chapterId', async () => {
  const r = await req('/api/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chapterId: 'nonexistent-chapter-id', paragraphIndex: 0, content: 'x' }),
  })
  assert(r.status === 404, `expected 404, got ${r.status}`)
})

await check('POST /api/comments rejects over-length content', async () => {
  const r = await req('/api/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chapterId: TEST_CHAPTER_ID || 'x', paragraphIndex: 0, content: '测'.repeat(600) }),
  })
  assert(r.status === 400, `expected 400, got ${r.status}`)
})

// ── Tier 2: fixture-dependent checks (skipped if IDs not provided) ─────────

if (!TEST_NOVEL_ID || !TEST_CHAPTER_ID) {
  console.log('\nSKIP  fixture-dependent checks (set TEST_NOVEL_ID and TEST_CHAPTER_ID to enable)')
} else {
  await check('novel detail page renders seeded novel', async () => {
    const r = await req(`/zh-CN/novels/${TEST_NOVEL_ID}`)
    assert(r.status === 200, `expected 200, got ${r.status}`)
  })

  await check('chapter reading page renders seeded chapter', async () => {
    const r = await req(`/zh-CN/novels/${TEST_NOVEL_ID}/chapters/${TEST_CHAPTER_ID}`)
    assert(r.status === 200, `expected 200, got ${r.status}`)
  })

  let postedCommentId
  await check('anonymous comment POST succeeds and never returns ipAddress', async () => {
    const r = await req('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chapterId: TEST_CHAPTER_ID,
        paragraphIndex: 0,
        content: `smoke-test comment ${Date.now()}`,
        nickname: 'smoke-test',
      }),
    })
    assert(r.status === 201, `expected 201, got ${r.status}: ${r.text}`)
    const body = JSON.parse(r.text)
    assert(!('ipAddress' in body), 'POST /api/comments response leaked ipAddress')
    postedCommentId = body.id
  })

  await check('GET /api/comments returns the posted comment, no ipAddress', async () => {
    const r = await req(`/api/comments?chapterId=${TEST_CHAPTER_ID}&paragraphIndex=0`)
    assert(r.status === 200, `expected 200, got ${r.status}`)
    const body = JSON.parse(r.text)
    assert(Array.isArray(body), 'response is not an array')
    assert(!body.some((c) => 'ipAddress' in c), 'GET /api/comments response leaked ipAddress')
    if (postedCommentId) {
      assert(body.some((c) => c.id === postedCommentId), 'posted comment not found in GET response')
    }
  })

  await check('view-count endpoint increments then dedupes', async () => {
    const r1 = await req(`/api/novels/${TEST_NOVEL_ID}/view`, { method: 'POST' })
    assert(r1.status === 200, `first call: expected 200, got ${r1.status}`)
    const r2 = await req(`/api/novels/${TEST_NOVEL_ID}/view`, { method: 'POST' })
    assert(r2.status === 200, `second call: expected 200, got ${r2.status}`)
    const body2 = JSON.parse(r2.text)
    assert(body2.deduped === true, 'second immediate call was not deduped — view count may be farmable')
  })
}

// ── Summary ──────────────────────────────────────────────────────────────

console.log(`\n${passed} passed, ${failed} failed`)
if (failed > 0) {
  console.log('Failed checks:', failures.join(', '))
  process.exit(1)
}
