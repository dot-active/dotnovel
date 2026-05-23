-- CreateTable novel_categories join table
CREATE TABLE IF NOT EXISTS "novel_categories" (
    "novelId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "novel_categories_pkey" PRIMARY KEY ("novelId","categoryId")
);

-- Migrate existing data: novels.categoryId -> novel_categories
INSERT INTO "novel_categories" ("novelId", "categoryId")
SELECT "id", "categoryId"
FROM "novels"
WHERE "categoryId" IS NOT NULL
ON CONFLICT DO NOTHING;

-- AddForeignKey
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'novel_categories_novelId_fkey') THEN
    ALTER TABLE "novel_categories" ADD CONSTRAINT "novel_categories_novelId_fkey"
      FOREIGN KEY ("novelId") REFERENCES "novels"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'novel_categories_categoryId_fkey') THEN
    ALTER TABLE "novel_categories" ADD CONSTRAINT "novel_categories_categoryId_fkey"
      FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- Drop old FK and column from novels
ALTER TABLE "novels" DROP CONSTRAINT IF EXISTS "novels_categoryId_fkey";
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='novels' AND column_name='categoryId') THEN
    ALTER TABLE "novels" DROP COLUMN "categoryId";
  END IF;
END $$;
