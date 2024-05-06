/*
  Warnings:

  - You are about to drop the column `permission_group_id` on the `permission` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `permission_group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_to_permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_to_role` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "permission" DROP CONSTRAINT "fk_permission_permission_group";

-- DropForeignKey
ALTER TABLE "role_to_permission" DROP CONSTRAINT "fk_role_to_permission_role";

-- DropForeignKey
ALTER TABLE "user_to_permission" DROP CONSTRAINT "fk_user_to_permission_role";

-- DropForeignKey
ALTER TABLE "user_to_permission" DROP CONSTRAINT "fk_user_to_permission_user";

-- DropForeignKey
ALTER TABLE "user_to_role" DROP CONSTRAINT "fk_user_to_role_role";

-- DropForeignKey
ALTER TABLE "user_to_role" DROP CONSTRAINT "fk_user_to_role_user";

-- DropIndex
DROP INDEX "ixfk_permission_permission_group_id";

-- DropIndex
DROP INDEX "ixuq_user_username";

-- AlterTable
ALTER TABLE "permission" DROP COLUMN "permission_group_id",
ADD COLUMN     "roleId" UUID,
ALTER COLUMN "resource_name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "full_name",
DROP COLUMN "refresh_token",
DROP COLUMN "student_id",
DROP COLUMN "username",
ADD COLUMN     "address" VARCHAR(100),
ADD COLUMN     "date_of_birth" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" VARCHAR(255) NOT NULL,
ADD COLUMN     "first_name" VARCHAR(100) NOT NULL,
ADD COLUMN     "gender" VARCHAR(20),
ADD COLUMN     "last_name" VARCHAR(100) NOT NULL,
ADD COLUMN     "phone_number" VARCHAR(10) NOT NULL;

-- DropTable
DROP TABLE "permission_group";

-- DropTable
DROP TABLE "user_to_permission";

-- DropTable
DROP TABLE "user_to_role";

-- CreateIndex
CREATE UNIQUE INDEX "ixuq_user_email" ON "user"("email");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_id_fkey" FOREIGN KEY ("id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_to_permission" ADD CONSTRAINT "role_to_permission_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
