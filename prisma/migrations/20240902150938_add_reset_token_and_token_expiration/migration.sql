-- AlterTable
ALTER TABLE "UserAuth" ADD COLUMN     "resetToken" VARCHAR(255),
ADD COLUMN     "tokenExpiration" TIMESTAMP(3);
