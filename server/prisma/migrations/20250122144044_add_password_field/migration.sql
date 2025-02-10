-- CreateEnum
CREATE TYPE "InterviewStatus" AS ENUM ('scheduled', 'completed', 'canceled');

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "password" TEXT;

-- AlterTable
ALTER TABLE "Applicant" ADD COLUMN     "password" TEXT;

-- CreateTable
CREATE TABLE "Interview" (
    "interview_id" SERIAL NOT NULL,
    "application_id" INTEGER NOT NULL,
    "interview_dateTime" TIMESTAMP(3) NOT NULL,
    "interview_URL" TEXT NOT NULL,
    "interview_decision" TEXT,
    "interview_notes" TEXT,
    "status" "InterviewStatus" NOT NULL,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("interview_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Interview_application_id_key" ON "Interview"("application_id");

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "Application"("application_id") ON DELETE RESTRICT ON UPDATE CASCADE;
