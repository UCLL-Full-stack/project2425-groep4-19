-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "organisationId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "organisationId" INTEGER,

    CONSTRAINT "StockItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organisation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Organisation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockItemTag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "StockItemTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockItemTagRelation" (
    "stockItemId" INTEGER NOT NULL,
    "stockItemTagId" INTEGER NOT NULL,

    CONSTRAINT "StockItemTagRelation_pkey" PRIMARY KEY ("stockItemId","stockItemTagId")
);

-- CreateTable
CREATE TABLE "_StockItemTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_StockItemTags_AB_unique" ON "_StockItemTags"("A", "B");

-- CreateIndex
CREATE INDEX "_StockItemTags_B_index" ON "_StockItemTags"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockItem" ADD CONSTRAINT "StockItem_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockItemTagRelation" ADD CONSTRAINT "StockItemTagRelation_stockItemId_fkey" FOREIGN KEY ("stockItemId") REFERENCES "StockItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockItemTagRelation" ADD CONSTRAINT "StockItemTagRelation_stockItemTagId_fkey" FOREIGN KEY ("stockItemTagId") REFERENCES "StockItemTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StockItemTags" ADD CONSTRAINT "_StockItemTags_A_fkey" FOREIGN KEY ("A") REFERENCES "StockItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StockItemTags" ADD CONSTRAINT "_StockItemTags_B_fkey" FOREIGN KEY ("B") REFERENCES "StockItemTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
