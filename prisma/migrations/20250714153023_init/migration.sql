/*
  Warnings:

  - You are about to drop the column `editedById` on the `vouchers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "vouchers" DROP CONSTRAINT "vouchers_editedById_fkey";

-- AlterTable
ALTER TABLE "vouchers" DROP COLUMN "editedById",
ADD COLUMN     "updatedById" TEXT;

-- AddForeignKey
ALTER TABLE "vouchers" ADD CONSTRAINT "vouchers_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
