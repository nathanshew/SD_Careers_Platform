/*
  Warnings:

  - Added the required column `positionsAvailable` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requirements` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "positionsAvailable" INTEGER NOT NULL,
ADD COLUMN     "requirements" TEXT NOT NULL;
