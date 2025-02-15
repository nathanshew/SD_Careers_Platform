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
