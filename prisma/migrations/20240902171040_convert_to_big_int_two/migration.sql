/*
  Warnings:

  - The primary key for the `ApplicationResponse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserAuth` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "ApplicationResponse" DROP CONSTRAINT "ApplicationResponse_userid_fkey";

-- DropForeignKey
ALTER TABLE "QRCodeRegistered" DROP CONSTRAINT "QRCodeRegistered_userid_fkey";

-- AlterTable
ALTER TABLE "ApplicationResponse" DROP CONSTRAINT "ApplicationResponse_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ALTER COLUMN "userid" SET DATA TYPE BIGINT,
ADD CONSTRAINT "ApplicationResponse_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "QRCodeRegistered" ALTER COLUMN "userid" SET DATA TYPE BIGINT;

-- AlterTable
CREATE SEQUENCE user_id_seq;
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq'),
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE user_id_seq OWNED BY "User"."id";

-- AlterTable
ALTER TABLE "UserAuth" DROP CONSTRAINT "UserAuth_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "UserAuth_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "ApplicationResponse" ADD CONSTRAINT "ApplicationResponse_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QRCodeRegistered" ADD CONSTRAINT "QRCodeRegistered_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
