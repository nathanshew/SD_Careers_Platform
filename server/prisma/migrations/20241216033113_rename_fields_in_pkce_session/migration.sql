/*
  Warnings:

  - You are about to drop the column `codeVerifier` on the `PKCESession` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `PKCESession` table. All the data in the column will be lost.
  - Added the required column `code_verifier` to the `PKCESession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PKCESession" DROP COLUMN "codeVerifier",
DROP COLUMN "createdAt",
ADD COLUMN     "code_verifier" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
