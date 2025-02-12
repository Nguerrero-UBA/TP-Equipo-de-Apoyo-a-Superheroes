/*
  Warnings:

  - Changed the type of `victima` on the `Crimen` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Crimen" DROP COLUMN "victima",
ADD COLUMN     "victima" INTEGER NOT NULL;
