-- AlterTable
ALTER TABLE "user_auth" ADD COLUMN     "resetToken" VARCHAR(255),
ADD COLUMN     "tokenExpiration" TIMESTAMP(3);
