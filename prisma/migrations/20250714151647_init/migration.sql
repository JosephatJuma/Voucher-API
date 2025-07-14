-- AlterTable
ALTER TABLE "vouchers" ADD COLUMN     "editedById" TEXT;

-- AddForeignKey
ALTER TABLE "vouchers" ADD CONSTRAINT "vouchers_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
