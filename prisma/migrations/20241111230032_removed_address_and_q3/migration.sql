/*
  Warnings:

  - You are about to drop the column `q3` on the `ApplicationResponse` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ApplicationResponse" DROP COLUMN "q3";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address";
