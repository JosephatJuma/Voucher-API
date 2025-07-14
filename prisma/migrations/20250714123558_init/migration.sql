-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'VENDOR');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "rolse" "Role" NOT NULL DEFAULT 'USER';
