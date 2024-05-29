/*
  Warnings:

  - A unique constraint covering the columns `[email,tenantId]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tenantId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ixuq_user_email";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "tenantId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "Tenant" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "display_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "pk_tenant" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ixuq_code" ON "Tenant"("display_name");

-- CreateIndex
CREATE UNIQUE INDEX "ixuq_user_email" ON "user"("email", "tenantId");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
