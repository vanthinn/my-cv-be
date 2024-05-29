/*
  Warnings:

  - The `gpa` column on the `education` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "cv" ADD COLUMN     "interests" VARCHAR(500)[];

-- AlterTable
ALTER TABLE "education" DROP COLUMN "gpa",
ADD COLUMN     "gpa" DECIMAL(4,2);
