/*
  Warnings:

  - You are about to drop the column `company` on the `Judge` table. All the data in the column will be lost.
  - You are about to drop the column `isGuest` on the `Judge` table. All the data in the column will be lost.
  - You are about to drop the column `trackTagId` on the `Judge` table. All the data in the column will be lost.
  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `totalInvestment` on the `Project` table. All the data in the column will be lost.
  - You are about to alter the column `description` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `team_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `CategoryTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventParticipation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GeneralProject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Investment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SunlifeProject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeejLabProject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryTagsOnProjects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_JudgesOnProjects` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[login_key]` on the table `Judge` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `login_key` to the `Judge` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `Project` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `description` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `devpostLink` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "EventParticipation" DROP CONSTRAINT "EventParticipation_projectId_fkey";

-- DropForeignKey
ALTER TABLE "GeneralProject" DROP CONSTRAINT "GeneralProject_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Investment" DROP CONSTRAINT "Investment_judgeId_fkey";

-- DropForeignKey
ALTER TABLE "Investment" DROP CONSTRAINT "Investment_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Judge" DROP CONSTRAINT "Judge_trackTagId_fkey";

-- DropForeignKey
ALTER TABLE "SunlifeProject" DROP CONSTRAINT "SunlifeProject_projectId_fkey";

-- DropForeignKey
ALTER TABLE "TeejLabProject" DROP CONSTRAINT "TeejLabProject_projectId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryTagsOnProjects" DROP CONSTRAINT "_CategoryTagsOnProjects_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryTagsOnProjects" DROP CONSTRAINT "_CategoryTagsOnProjects_B_fkey";

-- DropForeignKey
ALTER TABLE "_JudgesOnProjects" DROP CONSTRAINT "_JudgesOnProjects_A_fkey";

-- DropForeignKey
ALTER TABLE "_JudgesOnProjects" DROP CONSTRAINT "_JudgesOnProjects_B_fkey";

-- AlterTable
ALTER TABLE "Judge" DROP COLUMN "company",
DROP COLUMN "isGuest",
DROP COLUMN "trackTagId",
ADD COLUMN     "login_key" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey",
DROP COLUMN "totalInvestment",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "devpostLink" SET NOT NULL,
ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "team_id",
ADD COLUMN     "project_id" UUID;

-- DropTable
DROP TABLE "CategoryTag";

-- DropTable
DROP TABLE "EventParticipation";

-- DropTable
DROP TABLE "GeneralProject";

-- DropTable
DROP TABLE "Investment";

-- DropTable
DROP TABLE "SunlifeProject";

-- DropTable
DROP TABLE "TeejLabProject";

-- DropTable
DROP TABLE "_CategoryTagsOnProjects";

-- DropTable
DROP TABLE "_JudgesOnProjects";

-- CreateTable
CREATE TABLE "InvestmentHistory" (
    "id" SERIAL NOT NULL,
    "projectValue" INTEGER NOT NULL,
    "judgeId" INTEGER NOT NULL,
    "projectId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InvestmentHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JudgeProject" (
    "judgeId" INTEGER NOT NULL,
    "projectId" UUID NOT NULL,

    CONSTRAINT "JudgeProject_pkey" PRIMARY KEY ("judgeId","projectId")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JudgeCategory" (
    "judgeId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "JudgeCategory_pkey" PRIMARY KEY ("judgeId","categoryId")
);

-- CreateTable
CREATE TABLE "ProjectCategory" (
    "projectId" UUID NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "investmentAmount" INTEGER NOT NULL,

    CONSTRAINT "ProjectCategory_pkey" PRIMARY KEY ("projectId","categoryId")
);

-- CreateIndex
CREATE INDEX "InvestmentHistory_judgeId_idx" ON "InvestmentHistory"("judgeId");

-- CreateIndex
CREATE INDEX "InvestmentHistory_projectId_idx" ON "InvestmentHistory"("projectId");

-- CreateIndex
CREATE INDEX "InvestmentHistory_judgeId_projectId_idx" ON "InvestmentHistory"("judgeId", "projectId");

-- CreateIndex
CREATE INDEX "JudgeProject_judgeId_idx" ON "JudgeProject"("judgeId");

-- CreateIndex
CREATE INDEX "JudgeCategory_judgeId_idx" ON "JudgeCategory"("judgeId");

-- CreateIndex
CREATE INDEX "JudgeCategory_categoryId_idx" ON "JudgeCategory"("categoryId");

-- CreateIndex
CREATE INDEX "ProjectCategory_categoryId_idx" ON "ProjectCategory"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Judge_login_key_key" ON "Judge"("login_key");

-- CreateIndex
CREATE INDEX "User_project_id_idx" ON "User"("project_id");

-- AddForeignKey
ALTER TABLE "InvestmentHistory" ADD CONSTRAINT "InvestmentHistory_judgeId_fkey" FOREIGN KEY ("judgeId") REFERENCES "Judge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestmentHistory" ADD CONSTRAINT "InvestmentHistory_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JudgeProject" ADD CONSTRAINT "JudgeProject_judgeId_fkey" FOREIGN KEY ("judgeId") REFERENCES "Judge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JudgeProject" ADD CONSTRAINT "JudgeProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JudgeCategory" ADD CONSTRAINT "JudgeCategory_judgeId_fkey" FOREIGN KEY ("judgeId") REFERENCES "Judge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JudgeCategory" ADD CONSTRAINT "JudgeCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCategory" ADD CONSTRAINT "ProjectCategory_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCategory" ADD CONSTRAINT "ProjectCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
