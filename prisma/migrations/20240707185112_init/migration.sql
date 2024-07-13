-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL,
    "firstname" VARCHAR(50) NOT NULL,
    "lastname" VARCHAR(50) NOT NULL,
    "age" INTEGER,
    "email" VARCHAR(100) NOT NULL,
    "phone_number" VARCHAR(20),
    "school" VARCHAR(100),
    "level_of_study" VARCHAR(50),
    "country_of_residence" VARCHAR(255),
    "address" VARCHAR(255),
    "dietary_restrictions" VARCHAR(100),
    "github" VARCHAR(255),
    "linkedin" VARCHAR(255),
    "personal_website" VARCHAR(255),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "application_responses" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "q1" VARCHAR(1000) NOT NULL,
    "q2" VARCHAR(1000) NOT NULL,
    "q3" VARCHAR(1000) NOT NULL,

    CONSTRAINT "application_responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_auth" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(60) NOT NULL,

    CONSTRAINT "user_auth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "application_responses_userid_idx" ON "application_responses"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "user_auth_email_key" ON "user_auth"("email");

-- AddForeignKey
ALTER TABLE "application_responses" ADD CONSTRAINT "application_responses_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
