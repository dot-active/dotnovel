// One-off script: apply translation schema migrations via Neon HTTP
// Run with: node scripts/apply-translation-migration.js
// Load env manually since dotenv may not be available
const fs = require('fs')
const envPath = fs.existsSync('.env.local') ? '.env.local' : '.env'
const envFile = fs.readFileSync(envPath, 'utf8')
envFile.split('\n').forEach(line => {
  const m = line.match(/^([^#=]+)=(.*)$/)
  if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '')
})
const { neon } = require('@neondatabase/serverless')

const sql = neon(process.env.DATABASE_URL)

async function main() {
  console.log('Applying translation migration…')

  await sql`ALTER TABLE "novel_translations" ADD COLUMN IF NOT EXISTS "status" VARCHAR(50) NOT NULL DEFAULT 'published'`
  console.log('✓ novel_translations.status')

  await sql`ALTER TABLE "chapter_translations" ADD COLUMN IF NOT EXISTS "status" VARCHAR(50) NOT NULL DEFAULT 'published'`
  console.log('✓ chapter_translations.status')

  // Rename locale → targetLocale if still old column name
  await sql`
    DO $$ BEGIN
      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='translation_requests' AND column_name='locale') THEN
        ALTER TABLE "translation_requests" RENAME COLUMN "locale" TO "targetLocale";
      END IF;
    END $$
  `
  console.log('✓ translation_requests.locale → targetLocale')

  await sql`ALTER TABLE "translation_requests" ADD COLUMN IF NOT EXISTS "totalChapters" INTEGER NOT NULL DEFAULT 0`
  await sql`ALTER TABLE "translation_requests" ADD COLUMN IF NOT EXISTS "doneChapters" INTEGER NOT NULL DEFAULT 0`
  await sql`ALTER TABLE "translation_requests" ADD COLUMN IF NOT EXISTS "triggerRunId" TEXT`
  await sql`ALTER TABLE "translation_requests" ADD COLUMN IF NOT EXISTS "errorMessage" TEXT`
  await sql`ALTER TABLE "translation_requests" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP`
  console.log('✓ translation_requests new columns')

  await sql`CREATE UNIQUE INDEX IF NOT EXISTS "translation_requests_novelId_targetLocale_key" ON "translation_requests"("novelId", "targetLocale")`
  console.log('✓ unique index on translation_requests')

  console.log('Migration complete.')
}

main().catch(e => { console.error(e); process.exit(1) })
