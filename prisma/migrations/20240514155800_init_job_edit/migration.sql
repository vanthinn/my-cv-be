/*
  Warnings:

  - The `skills` column on the `cv` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `skills` column on the `job` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "cv" DROP COLUMN "skills",
ADD COLUMN     "skills" VARCHAR(500)[];

-- AlterTable
ALTER TABLE "job" DROP COLUMN "skills",
ADD COLUMN     "skills" VARCHAR(200)[];
