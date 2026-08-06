-- CreateTable
CREATE TABLE "author_points" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "author_points_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "author_points_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "novelId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "author_points_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "author_points_userId_key" ON "author_points"("userId");

-- CreateIndex
CREATE INDEX "author_points_logs_userId_createdAt_idx" ON "author_points_logs"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "author_points_logs" ADD CONSTRAINT "author_points_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "author_points"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
