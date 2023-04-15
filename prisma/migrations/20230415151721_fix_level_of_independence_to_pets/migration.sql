/*
  Warnings:

  - You are about to drop the column `level_of_idependence` on the `pets` table. All the data in the column will be lost.
  - Added the required column `level_of_independence` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LevelOfIndependence" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "level_of_idependence",
ADD COLUMN     "level_of_independence" "LevelOfIndependence" NOT NULL;

-- DropEnum
DROP TYPE "LevelOfIdependence";
