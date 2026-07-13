-- RenameColumn (preserve existing commenter identity as the logged-in userId)
ALTER TABLE "comments" RENAME COLUMN "authorId" TO "userId";
ALTER TABLE "comments" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "comments"
  ADD COLUMN "nickname" TEXT,
  ADD COLUMN "ipAddress" TEXT;

-- CreateIndex
CREATE INDEX "comments_chapterId_paragraphIndex_idx" ON "comments"("chapterId", "paragraphIndex");
