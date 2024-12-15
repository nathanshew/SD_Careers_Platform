-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('submitted', 'shortlisted', 'rejected');

-- CreateTable
CREATE TABLE "Application" (
    "application_id" SERIAL NOT NULL,
    "applicant_id" INTEGER NOT NULL,
    "job_id" INTEGER NOT NULL,
    "status" "ApplicationStatus" NOT NULL,
    "name" TEXT NOT NULL,
    "telegram" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "major" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "linkedin_url" TEXT NOT NULL,
    "resume_url" TEXT NOT NULL,
    "applicant_desc" TEXT NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("application_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Application_applicant_id_job_id_key" ON "Application"("applicant_id", "job_id");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "Applicant"("applicant_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("job_id") ON DELETE RESTRICT ON UPDATE CASCADE;
