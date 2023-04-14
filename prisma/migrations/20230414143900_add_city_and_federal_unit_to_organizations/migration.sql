/*
  Warnings:

  - Added the required column `city` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `federal_unit` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "federal_unit" TEXT NOT NULL;
