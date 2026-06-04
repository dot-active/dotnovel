import { neon } from '@neondatabase/serverless'
import { readFileSync } from 'fs'

// Load env manually
const env = Object.fromEntries(
  readFileSync('.env', 'utf8')
    .split('\n')
    .filter(l => l.includes('=') && !l.startsWith('#'))
    .map(l => { const i = l.indexOf('='); const v = l.slice(i + 1).trim().replace(/^["']|["']$/g, ''); return [l.slice(0, i).trim(), v] })
)

const sql = neon(env.DATABASE_URL)

try {
  await sql`ALTER TABLE novels ADD COLUMN IF NOT EXISTS "isFeatured" BOOLEAN NOT NULL DEFAULT false`
  console.log('✓ Column isFeatured added to novels table')

  // Verify the column exists
  const check = await sql`
    SELECT column_name FROM information_schema.columns
    WHERE table_name = 'novels' AND column_name = 'isFeatured'
  `
  console.log('✓ Verified:', check.length > 0 ? 'isFeatured column exists' : 'column NOT found!')
} catch (e) {
  console.error('Error:', e.message)
  process.exit(1)
}
