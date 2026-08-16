-- CreateIndex
CREATE INDEX "novels_authorId_idx" ON "novels"("authorId");

-- CreateIndex
CREATE INDEX "novels_publishStatus_viewCount_idx" ON "novels"("publishStatus", "viewCount");

-- CreateIndex
CREATE INDEX "novels_publishStatus_favoriteCount_idx" ON "novels"("publishStatus", "favoriteCount");

-- CreateIndex
CREATE INDEX "comments_userId_idx" ON "comments"("userId");
