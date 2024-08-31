/*
  Warnings:

  - You are about to drop the `application_responses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_auth` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "application_responses" DROP CONSTRAINT "application_responses_userid_fkey";

-- DropTable
DROP TABLE "application_responses";

-- DropTable
DROP TABLE "user_auth";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "firstname" VARCHAR(50) NOT NULL,
    "lastname" VARCHAR(50) NOT NULL,
    "age" INTEGER NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,
    "school" VARCHAR(100) NOT NULL,
    "level_of_study" VARCHAR(100) NOT NULL,
    "country_of_residence" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255),
    "dietary_restrictions" VARCHAR(100) NOT NULL,
    "github" VARCHAR(255),
    "linkedin" VARCHAR(255),
    "personal_website" VARCHAR(255),
    "MLH_authorize" BOOLEAN,
    "field_of_study" VARCHAR(100) NOT NULL,
    "optional_consider" VARCHAR(255),
    "optional_gender" VARCHAR(50),
    "optional_pronouns" VARCHAR(50),
    "optional_race" VARCHAR(50),
    "optional_underrepresented" TEXT,
    "other_dietary_restrictions" VARCHAR(100),
    "resume" VARCHAR(255),
    "t_shirt_size" VARCHAR(50),
    "status" "UserStatus" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationResponse" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "q1" VARCHAR(1000) NOT NULL,
    "q2" VARCHAR(1000) NOT NULL,
    "q3" VARCHAR(1000) NOT NULL,

    CONSTRAINT "ApplicationResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAuth" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(60) NOT NULL,

    CONSTRAINT "UserAuth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QRCodeRegistered" (
    "qrCodeId" VARCHAR(255) NOT NULL,
    "userid" INTEGER NOT NULL,

    CONSTRAINT "QRCodeRegistered_pkey" PRIMARY KEY ("qrCodeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "ApplicationResponse_userid_idx" ON "ApplicationResponse"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "UserAuth_email_key" ON "UserAuth"("email");

-- CreateIndex
CREATE INDEX "QRCodeRegistered_userid_idx" ON "QRCodeRegistered"("userid");

-- AddForeignKey
ALTER TABLE "ApplicationResponse" ADD CONSTRAINT "ApplicationResponse_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QRCodeRegistered" ADD CONSTRAINT "QRCodeRegistered_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
