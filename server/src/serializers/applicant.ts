import { Applicant } from '@prisma/client';

export function applicantSerializer(applicant: Applicant) {
  const { password, ...sanitizedData } = applicant; // Exclude `password`
  return sanitizedData;
}
