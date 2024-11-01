import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { logRequest } from "../utils/logUtil";

const prisma = new PrismaClient();
const router = Router();

// Define the type for job input
interface JobInput {
  title: string;
  department_id: number;
  description: string;
  semester: string;
  deadline: Date;
  status: 'open' | 'closed';
  created_by: number;
}

// Create a new job
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
router.post("/", async (req: Request<{}, {}, JobInput>, res: Response) => {
  logRequest(req);
  const { title, department_id, description, semester, deadline, status, created_by } = req.body;
  try {
    console.log(`Creating job with title: ${title}`);
    const job = await prisma.job.create({
      data: { title, department_id, description, semester, deadline, status, created_by },
    });
    console.log(`Job created with ID: ${job.job_id}`);
    res.status(201).json(job);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(400).json({ error: "Error creating job" });
  }
});

// Get all jobs
router.get("/", async (_req: Request, res: Response) => {
  logRequest(_req);
  try {
    console.log("Fetching all jobs");
    const jobs = await prisma.job.findMany();
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Error fetching jobs" });
  }
});

// Get a single job by ID
router.get("/:id", async (req: Request, res: Response) => {
  logRequest(req);
  const { id } = req.params;
  try {
    console.log(`Fetching job with ID: ${id}`);
    const job = await prisma.job.findUnique({
      where: { job_id: Number(id) },
    });
    if (job) {
      console.log(`Job found: ${job.title}`);
      res.json(job);
    } else {
      console.warn(`Job with ID ${id} not found`);
      res.status(404).json({ error: "Job not found" });
    }
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ error: "Error fetching job" });
  }
});

// Update a job by ID
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
router.put("/:id", async (req: Request<{ id: string }, {}, JobInput>, res: Response) => {
  logRequest(req);
  const { id } = req.params;
  const { title, department_id, description, semester, deadline, status, created_by } = req.body;
  try {
    console.log(`Updating job with ID: ${id}`);
    const updatedJob = await prisma.job.update({
      where: { job_id: Number(id) },
      data: { title, department_id, description, semester, deadline, status, created_by },
    });
    console.log(`Job with ID ${id} updated`);
    res.json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(400).json({ error: "Error updating job" });
  }
});

// Delete a job by ID
router.delete("/:id", async (req: Request, res: Response) => {
  logRequest(req);
  const { id } = req.params;
  try {
    console.log(`Deleting job with ID: ${id}`);
    await prisma.job.delete({
      where: { job_id: Number(id) },
    });
    console.log(`Job with ID ${id} deleted`);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(400).json({ error: "Error deleting job" });
  }
});

export default router;