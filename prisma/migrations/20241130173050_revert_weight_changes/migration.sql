/*
  Warnings:

  - You are about to drop the column `category` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `isBodyweight` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `muscleGroups` on the `Exercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "category",
DROP COLUMN "description",
DROP COLUMN "isBodyweight",
DROP COLUMN "muscleGroups";

-- AlterTable
ALTER TABLE "ExerciseLibrary" ADD COLUMN     "bodyWeight" BOOLEAN NOT NULL DEFAULT false;
