/*
  Warnings:

  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_employerId_fkey";

-- DropForeignKey
ALTER TABLE "employer" DROP CONSTRAINT "employer_roleId_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "companyId" UUID;

-- DropTable
DROP TABLE "Company";

-- DropTable
DROP TABLE "employer";

-- CreateTable
CREATE TABLE "company" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "display_name" VARCHAR(50) NOT NULL,
    "address" VARCHAR(50) NOT NULL,
    "logoUrl" VARCHAR(500) NOT NULL,
    "imageUrl" VARCHAR(500),
    "email" VARCHAR(50) NOT NULL,
    "phone_number" VARCHAR(50) NOT NULL,
    "filed_of_activity" VARCHAR(50) NOT NULL,
    "scale" VARCHAR(100) NOT NULL,
    "description" VARCHAR(1000),
    "website" VARCHAR(50),

    CONSTRAINT "pk_company" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "jobTitle" VARCHAR(50) NOT NULL,
    "experience" VARCHAR(50) NOT NULL,
    "salary" VARCHAR(100) NOT NULL,
    "skills" VARCHAR(200),
    "jobType" VARCHAR(50) NOT NULL,
    "education" VARCHAR(50),
    "deadline" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" VARCHAR(1000) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "userId" UUID NOT NULL,
    "companyId" UUID NOT NULL,

    CONSTRAINT "pk_job" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_apply" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "candidateName" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "jobId" UUID NOT NULL,
    "CVId" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "pk_job_apply" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "fk_user_to_company" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "fk_user_to_job" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "fk_job_to_company" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_apply" ADD CONSTRAINT "fk_job_to_job_apply" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_apply" ADD CONSTRAINT "fk_cv_to_job_apply" FOREIGN KEY ("CVId") REFERENCES "cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;
