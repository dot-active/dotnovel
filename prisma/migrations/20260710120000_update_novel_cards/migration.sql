-- Add nullable "titles" column, backfill from the old "title" column, then enforce NOT NULL
ALTER TABLE "novel_card_translations" ADD COLUMN "titles" TEXT[];

UPDATE "novel_card_translations"
SET "titles" = CASE
  WHEN "title" IS NOT NULL AND btrim("title") <> '' THEN ARRAY["title"]
  ELSE '{}'::TEXT[]
END;

ALTER TABLE "novel_card_translations" ALTER COLUMN "titles" SET NOT NULL;

-- CreateTable
CREATE TABLE "novel_card_entries" (
    "id" TEXT NOT NULL,
    "translationId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "fromChapter" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "novel_card_entries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "novel_card_entries" ADD CONSTRAINT "novel_card_entries_translationId_fkey" FOREIGN KEY ("translationId") REFERENCES "novel_card_translations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Backfill entries: the old free-text "description" becomes a single entry visible from chapter 1
INSERT INTO "novel_card_entries" ("id", "translationId", "content", "fromChapter", "order", "createdAt")
SELECT gen_random_uuid()::text, "id", "description", 1, 1, now()
FROM "novel_card_translations"
WHERE "description" IS NOT NULL AND btrim("description") <> '';

-- Drop the old single-title/description columns now that data has been migrated
ALTER TABLE "novel_card_translations" DROP COLUMN "title";
ALTER TABLE "novel_card_translations" DROP COLUMN "description";
