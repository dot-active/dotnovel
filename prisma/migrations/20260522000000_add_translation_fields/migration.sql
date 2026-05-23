-- AlterTable: add status to novel_translations
ALTER TABLE "novel_translations" ADD COLUMN IF NOT EXISTS "status" VARCHAR(50) NOT NULL DEFAULT 'published';

-- AlterTable: add status to chapter_translations
ALTER TABLE "chapter_translations" ADD COLUMN IF NOT EXISTS "status" VARCHAR(50) NOT NULL DEFAULT 'published';

-- DropTable (old translation_requests) and recreate with new schema
-- Note: existing data is preserved by renaming the locale column
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='translation_requests' AND column_name='locale') THEN
    ALTER TABLE "translation_requests" RENAME COLUMN "locale" TO "targetLocale";
  END IF;
END $$;
ALTER TABLE "translation_requests" ADD COLUMN IF NOT EXISTS "totalChapters" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "translation_requests" ADD COLUMN IF NOT EXISTS "doneChapters" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "translation_requests" ADD COLUMN IF NOT EXISTS "triggerRunId" TEXT;
ALTER TABLE "translation_requests" ADD COLUMN IF NOT EXISTS "errorMessage" TEXT;
ALTER TABLE "translation_requests" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "translation_requests_novelId_targetLocale_key" ON "translation_requests"("novelId", "targetLocale");
