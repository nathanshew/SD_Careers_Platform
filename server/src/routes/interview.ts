import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { createInterviewSchema, editInterviewSchema } from "../validators/interview.js";
import { logRequest } from "../utils/logUtil.js";
import * as yup from 'yup';

const prisma = new PrismaClient();
const router = Router();

// Create a new interview
router.post("/", async (req: Request, res: Response) => {
  logRequest(req);
  try {
    console.log(`Validating input data`);
    const validatedData = await createInterviewSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    console.log(`Creating interview for application ID: ${validatedData.application_id}`);
    const interview = await prisma.interview.create({
      data: validatedData,
    });

    console.log(`Interview created with ID: ${interview.interview_id}`);
    res.status(201).json(interview);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      res.status(400).json({
        error: "Validation error",
        details: error.errors,
      });
    } else {
      console.error("Error creating interview:", error);
      res.status(400).json({ error: "Error creating interview" });
    }
  }
});

// Get all interviews
router.get("/", async (_req: Request, res: Response) => {
  logRequest(_req);
  try {
    console.log("Fetching all interviews");
    const interviews = await prisma.interview.findMany({
      include: {
        application: true,
      },
    });
    res.json(interviews);
  } catch (error) {
    console.error("Error fetching interviews:", error);
    res.status(500).json({ error: "Error fetching interviews" });
  }
});

// Get a single interview by ID
router.get("/:id", async (req: Request, res: Response) => {
  logRequest(req);
  const { id } = req.params;
  try {
    console.log(`Fetching interview with ID: ${id}`);
    const interview = await prisma.interview.findUnique({
      where: { interview_id: Number(id) },
      include: {
        application: true,
      },
    });
    if (interview) {
      res.json(interview);
    } else {
      console.warn(`Interview with ID ${id} not found`);
      res.status(404).json({ error: "Interview not found" });
    }
  } catch (error) {
    console.error("Error fetching interview:", error);
    res.status(500).json({ error: "Error fetching interview" });
  }
});

// Update an interview by ID
router.put("/:id", async (req: Request, res: Response) => {
  logRequest(req);
  const { id } = req.params;
  try {
    console.log(`Validating input data`);
    const validatedData = await editInterviewSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    console.log(`Updating interview with ID: ${id}`);
    const updatedInterview = await prisma.interview.update({
      where: { interview_id: Number(id) },
      data: validatedData,
    });

    console.log(`Interview with ID ${id} updated`);
    res.json(updatedInterview);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      res.status(400).json({
        error: "Validation error",
        details: error.errors,
      });
    } else {
      console.error("Error updating interview:", error);
      res.status(400).json({ error: "Error updating interview" });
    }
  }
});

export default router;