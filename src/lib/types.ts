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