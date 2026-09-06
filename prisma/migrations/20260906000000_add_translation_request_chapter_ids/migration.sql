-- Record which chapters each translation job covers, so the chapters page can
-- scope its "translating" badge to those rows instead of the whole novel.
-- Add nullable, backfill existing rows to an empty array, then enforce NOT NULL.
ALTER TABLE "translation_requests" ADD COLUMN "chapterIds" TEXT[];

UPDATE "translation_requests" SET "chapterIds" = '{}'::TEXT[] WHERE "chapterIds" IS NULL;

ALTER TABLE "translation_requests" ALTER COLUMN "chapterIds" SET NOT NULL;
