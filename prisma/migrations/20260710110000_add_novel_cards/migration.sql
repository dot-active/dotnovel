-- CreateTable
CREATE TABLE "novel_cards" (
    "id" TEXT NOT NULL,
    "novelId" TEXT NOT NULL,
    "imageUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "novel_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "novel_card_translations" (
    "id" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "novel_card_translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "novel_card_translations_cardId_locale_key" ON "novel_card_translations"("cardId", "locale");

-- AddForeignKey
ALTER TABLE "novel_cards" ADD CONSTRAINT "novel_cards_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "novels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novel_card_translations" ADD CONSTRAINT "novel_card_translations_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "novel_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
