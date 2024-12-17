/*
  Warnings:

  - You are about to drop the column `password` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Applicant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "password";

-- AlterTable
ALTER TABLE "Applicant" DROP COLUMN "password";
