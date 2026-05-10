-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "isReadByAuthor" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "novels" ADD COLUMN     "favoriteCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0;
