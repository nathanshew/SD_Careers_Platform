export type Job = {
    created_by: number;
    deadline: Date;
    department_id: number;
    department: {
      department_name: string;
    }
    description: string;
    job_id: number;
    positionsAvailable: number;
    requirements: string;
    semester: string;
    status: string;
    title: string;
}

export interface Participant {
    name: string;
    status: string;
    positionApplied: string;
    department: string;
    yearOfStudy: string;
    major: string;
    faculty: string;
    linkedInUrl: string;
    resumeLink: string;
    whyNFS: string;
    interviewDate: string;
    interviewer: string;
    interviewDecision: string;
}

export type Applicant = {
  applicant_id: number;
  username: string;
  email: string;
  password: string;
  applications: Application[];
};

export type Application = {
  application_id: number;
  applicant_id: number;
  job_id: number;
  status: 'submitted' | 'shortlisted' | 'rejected';
  name: string;
  telegram: string;
  phone: string;
  year: number;
  major: string;
  faculty: string;
  linkedin_url?: string;
  resume_url: string;
  applicant_desc: string;
  interview?: Interview;
};

export type Interview = {
  interview_id: number;
  application_id: number;
  interview_dateTime: Date;
  interview_URL: string;
  interview_decision?: string;
  interview_notes?: string;
  status: 'scheduled' | 'completed' | 'canceled';
};


// For the department nested object
export interface DepartmentData {
  department_name: string;
}

// For the job nested object
export interface JobDetails {
  title: string;
  department: DepartmentData;
  description: string;
  deadline: Date;
  status: string; // "open" | "closed"
}

// For the complete application data
export interface ApplicationData {
  application_id: number;
  applicant_id: number;
  job_id: number;
  status: "submitted" | "shortlisted" | "rejected"; // "submitted" | "shortlisted" | "rejected"
  name: string;
  telegram: string;
  phone: string;
  year: number;
  major: string;
  faculty: string;
  linkedin_url?: string; // Optional
  resume_url: string;
  applicant_desc: string;
  job: JobDetails;
}