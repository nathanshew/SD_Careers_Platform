import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { createJobSchema, editJobSchema } from "../validators/job.js";
import { logRequest } from "../utils/logUtil.js";
import * as yup from 'yup';

const prisma = new PrismaClient();
const router = Router();

// Create a new job
router.post("/", async (req: Request, res: Response) => {
  logRequest(req);
  try {
    console.log(`Validating input data`);
    const validatedData = await createJobSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true, // Required to prevent mass assignment vulnerabilities
    });

    console.log(`Creating job with title: ${validatedData.title}`);
    const job = await prisma.job.create({
      data: validatedData,
    });

    console.log(`Job created with ID: ${job.job_id}`);
    res.status(201).json(job);

  } catch (error) {
    if (error instanceof yup.ValidationError) {
      // If validation fails
      res.status(400).json({
        error: "Validation error",
        details: error.errors, // Array of validation error messages
      });
    } else {
      console.error("Error creating job:", error);
      res.status(400).json({ error: "Error creating job" });
    }
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
router.put("/:id", async (req: Request, res: Response) => {
  logRequest(req);
  const { id } = req.params;
  try {
    console.log(`Validating input data`);
    const validatedData = await editJobSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    console.log(`Updating job with ID: ${id}`);
    const updatedJob = await prisma.job.update({
      where: { job_id: Number(id) },
      data: validatedData,
    });

    console.log(`Job with ID ${id} updated`);
    res.json(updatedJob);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      // If validation fails
      res.status(400).json({
        error: "Validation error",
        details: error.errors, // Array of validation error messages
      });
    } else {
      console.error("Error updating job:", error);
      res.status(400).json({ error: "Error updating job" });
    }
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