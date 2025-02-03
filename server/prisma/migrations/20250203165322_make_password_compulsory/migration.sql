/*
  Warnings:

  - Made the column `password` on table `Admin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `Applicant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "password" SET NOT NULL;

-- AlterTable
ALTER TABLE "Applicant" ALTER COLUMN "password" SET NOT NULL;
