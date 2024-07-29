-- AlterEnum
ALTER TYPE "UserStatus" ADD VALUE 'APPLIED';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "field_of_study" SET DATA TYPE VARCHAR(100);
