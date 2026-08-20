-- CreateTable
CREATE TABLE "chapter_reads" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chapter_reads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "chapter_reads_userId_chapterId_key" ON "chapter_reads"("userId", "chapterId");

-- CreateIndex
CREATE INDEX "chapter_reads_chapterId_idx" ON "chapter_reads"("chapterId");

-- AddForeignKey
ALTER TABLE "chapter_reads" ADD CONSTRAINT "chapter_reads_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;
