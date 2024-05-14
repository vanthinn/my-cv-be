-- DropForeignKey
ALTER TABLE "certification" DROP CONSTRAINT "certification_CVId_fkey";

-- DropForeignKey
ALTER TABLE "cv" DROP CONSTRAINT "cv_userId_fkey";

-- DropForeignKey
ALTER TABLE "education" DROP CONSTRAINT "education_CVId_fkey";

-- DropForeignKey
ALTER TABLE "experience" DROP CONSTRAINT "experience_CVId_fkey";

-- DropForeignKey
ALTER TABLE "language" DROP CONSTRAINT "language_CVId_fkey";

-- DropForeignKey
ALTER TABLE "profile_cv" DROP CONSTRAINT "profile_cv_CVId_fkey";

-- AlterTable
ALTER TABLE "experience" ALTER COLUMN "end_date" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "cv" ADD CONSTRAINT "fk_cv_to_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_cv" ADD CONSTRAINT "fk_cv_to_profileCV" FOREIGN KEY ("CVId") REFERENCES "cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education" ADD CONSTRAINT "fk_cv_to_education" FOREIGN KEY ("CVId") REFERENCES "cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience" ADD CONSTRAINT "fk_cv_to_experience" FOREIGN KEY ("CVId") REFERENCES "cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certification" ADD CONSTRAINT "fk_cv_to_certification" FOREIGN KEY ("CVId") REFERENCES "cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "language" ADD CONSTRAINT "fk_cv_to_language" FOREIGN KEY ("CVId") REFERENCES "cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;
