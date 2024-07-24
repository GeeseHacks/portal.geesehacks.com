/*
  Warnings:

  - Added the required column `field_of_study` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `age` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone_number` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `school` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `level_of_study` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country_of_residence` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dietary_restrictions` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACCEPTED', 'REJECTED', 'WAITLIST', 'NOT_APPLIED');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "MLH_authorize" BOOLEAN,
ADD COLUMN     "field_of_study" VARCHAR(50) NOT NULL,
ADD COLUMN     "optional_consider" VARCHAR(255),
ADD COLUMN     "optional_gender" VARCHAR(50),
ADD COLUMN     "optional_pronouns" VARCHAR(50),
ADD COLUMN     "optional_race" VARCHAR(50),
ADD COLUMN     "optional_underrepresented" TEXT,
ADD COLUMN     "other_dietary_restrictions" VARCHAR(100),
ADD COLUMN     "resume" VARCHAR(255),
ADD COLUMN     "status" "UserStatus" NOT NULL,
ADD COLUMN     "t_shirt_size" VARCHAR(50),
ALTER COLUMN "age" SET NOT NULL,
ALTER COLUMN "phone_number" SET NOT NULL,
ALTER COLUMN "school" SET NOT NULL,
ALTER COLUMN "level_of_study" SET NOT NULL,
ALTER COLUMN "level_of_study" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "country_of_residence" SET NOT NULL,
ALTER COLUMN "dietary_restrictions" SET NOT NULL;
