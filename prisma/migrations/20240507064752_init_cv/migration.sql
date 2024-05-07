/*
  Warnings:

  - Added the required column `roleId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_id_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "refresh_token" VARCHAR(100),
ADD COLUMN     "roleId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "cv" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "template" VARCHAR(50) NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "font_style" VARCHAR(50),
    "font_size" VARCHAR(50),
    "color" VARCHAR(50),
    "skills" VARCHAR(500),
    "summary" VARCHAR(1000),
    "state" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,

    CONSTRAINT "pk_cv" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_cv" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(10) NOT NULL,
    "gender" VARCHAR(20) NOT NULL,
    "date_of_birth" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "address" VARCHAR(100),
    "avatar_url" VARCHAR(100),
    "facebook" VARCHAR(100),
    "linked_in" VARCHAR(100),
    "CVId" UUID NOT NULL,

    CONSTRAINT "pk_profile_cv" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "education" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "school_name" VARCHAR(100) NOT NULL,
    "location" VARCHAR(100) NOT NULL,
    "state" VARCHAR(100) NOT NULL,
    "field_of_study" VARCHAR NOT NULL,
    "gpa" VARCHAR(5) NOT NULL,
    "start_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CVId" UUID NOT NULL,

    CONSTRAINT "pk_education" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experience" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "position" VARCHAR(100) NOT NULL,
    "company" VARCHAR(100) NOT NULL,
    "location" VARCHAR(100) NOT NULL,
    "state" BOOLEAN,
    "start_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CVId" UUID NOT NULL,

    CONSTRAINT "pk_experience" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certification" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "display_name" VARCHAR(50) NOT NULL,
    "start_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CVId" UUID NOT NULL,

    CONSTRAINT "pk_certification" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "language" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "display_name" VARCHAR(50) NOT NULL,
    "level" VARCHAR(50) NOT NULL,
    "CVId" UUID NOT NULL,

    CONSTRAINT "pk_language" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "display_name" VARCHAR(50),
    "address" VARCHAR(50),
    "logoUrl" VARCHAR(50),
    "imageUrl" VARCHAR(500),
    "email" VARCHAR(50),
    "phone_number" VARCHAR(50),
    "filed_of_activity" VARCHAR(50),
    "scale" INTEGER,
    "description" VARCHAR(1000),
    "employerId" UUID NOT NULL,

    CONSTRAINT "pk_company" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employer" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "phone_number" VARCHAR(10) NOT NULL,
    "gender" VARCHAR(20),
    "date_of_birth" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "address" VARCHAR(100),
    "refresh_token" VARCHAR(100),
    "roleId" UUID NOT NULL,

    CONSTRAINT "pk_employer" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_cv_CVId_key" ON "profile_cv"("CVId");

-- CreateIndex
CREATE UNIQUE INDEX "education_CVId_key" ON "education"("CVId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_employerId_key" ON "Company"("employerId");

-- CreateIndex
CREATE UNIQUE INDEX "employer_roleId_key" ON "employer"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "ixuq_employer_email" ON "employer"("email");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cv" ADD CONSTRAINT "cv_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_cv" ADD CONSTRAINT "profile_cv_CVId_fkey" FOREIGN KEY ("CVId") REFERENCES "cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education" ADD CONSTRAINT "education_CVId_fkey" FOREIGN KEY ("CVId") REFERENCES "cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience" ADD CONSTRAINT "experience_CVId_fkey" FOREIGN KEY ("CVId") REFERENCES "cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certification" ADD CONSTRAINT "certification_CVId_fkey" FOREIGN KEY ("CVId") REFERENCES "cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "language" ADD CONSTRAINT "language_CVId_fkey" FOREIGN KEY ("CVId") REFERENCES "cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "employer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employer" ADD CONSTRAINT "employer_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
