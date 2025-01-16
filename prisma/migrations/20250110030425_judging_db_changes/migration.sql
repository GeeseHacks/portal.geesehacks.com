/*
  Warnings:

  - You are about to drop the `JudgePair` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_JudgePairTeams` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "JudgePair" DROP CONSTRAINT "JudgePair_primaryJudgeId_fkey";

-- DropForeignKey
ALTER TABLE "JudgePair" DROP CONSTRAINT "JudgePair_secondaryJudgeId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_projectId_fkey";

-- DropForeignKey
ALTER TABLE "_JudgePairTeams" DROP CONSTRAINT "_JudgePairTeams_A_fkey";

-- DropForeignKey
ALTER TABLE "_JudgePairTeams" DROP CONSTRAINT "_JudgePairTeams_B_fkey";

-- AlterTable
ALTER TABLE "Judge" ADD COLUMN     "trackTagId" INTEGER;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "description" TEXT,
ADD COLUMN     "devpostLink" VARCHAR(255),
ADD COLUMN     "imageUrl" VARCHAR(255);

-- DropTable
DROP TABLE "JudgePair";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_JudgePairTeams";

-- CreateTable
CREATE TABLE "CategoryTag" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "color" VARCHAR(7) NOT NULL,

    CONSTRAINT "CategoryTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneralProject" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "GeneralProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SunlifeProject" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "SunlifeProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeejLabProject" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "TeejLabProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_JudgesOnProjects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryTagsOnProjects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "CategoryTag_name_idx" ON "CategoryTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_JudgesOnProjects_AB_unique" ON "_JudgesOnProjects"("A", "B");

-- CreateIndex
CREATE INDEX "_JudgesOnProjects_B_index" ON "_JudgesOnProjects"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryTagsOnProjects_AB_unique" ON "_CategoryTagsOnProjects"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryTagsOnProjects_B_index" ON "_CategoryTagsOnProjects"("B");

-- AddForeignKey
ALTER TABLE "Judge" ADD CONSTRAINT "Judge_trackTagId_fkey" FOREIGN KEY ("trackTagId") REFERENCES "CategoryTag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneralProject" ADD CONSTRAINT "GeneralProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SunlifeProject" ADD CONSTRAINT "SunlifeProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeejLabProject" ADD CONSTRAINT "TeejLabProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JudgesOnProjects" ADD CONSTRAINT "_JudgesOnProjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Judge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JudgesOnProjects" ADD CONSTRAINT "_JudgesOnProjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryTagsOnProjects" ADD CONSTRAINT "_CategoryTagsOnProjects_A_fkey" FOREIGN KEY ("A") REFERENCES "CategoryTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryTagsOnProjects" ADD CONSTRAINT "_CategoryTagsOnProjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
