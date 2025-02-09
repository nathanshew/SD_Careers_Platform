import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { createApplicantSchema, editApplicantSchema } from "../validators/applicant.js";
import { logRequest } from "../utils/logUtil.js";
import { applicantSerializer } from "../serializers/applicant.js";
import * as yup from 'yup';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const router = Router();

// Create a new applicant
router.post("/", async (req: Request, res: Response) => {
  logRequest(req);
  try {
    console.log(`Validating input data`);
    const validatedData = await createApplicantSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true, 
    });

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    console.log(`Creating applicant with email: ${validatedData.email}`);
    const applicant = await prisma.applicant.create({
      data: {
        ...validatedData,
        password: hashedPassword,
      }
    });

    console.log(`Applicant created with ID: ${applicant.applicant_id}`);
    res.status(201).json(applicantSerializer(applicant));
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      // If validation fails
      res.status(400).json({
        error: "Validation error",
        details: error.errors, // Array of validation error messages
      });
    } else {
      console.error("Error creating applicant:", error);
      res.status(400).json({ error: "Error creating applicant" });
    }
  }
});

// Get all applicants
router.get("/", async (_req: Request, res: Response) => {
  logRequest(_req);
  try {
    console.log("Fetching all applicants");
    const applicants = await prisma.applicant.findMany();
    res.json(applicants.map(applicant => applicantSerializer(applicant)));
  } catch (error) {
    console.error("Error fetching applicants:", error);
    res.status(500).json({ error: "Error fetching applicants" });
  }
});

// Get a single applicant by ID
router.get("/:id", async (req: Request, res: Response) => {
  logRequest(req);
  const { id } = req.params;
  try {
    console.log(`Fetching applicant with ID: ${id}`);
    const applicant = await prisma.applicant.findUnique({
      where: { applicant_id: Number(id) },
    });
    if (applicant) {
      console.log(`Applicant found: ${applicant.username}`);
      res.json(applicantSerializer(applicant));
    } else {
      console.warn(`Applicant with ID ${id} not found`);
      res.status(404).json({ error: "Applicant not found" });
    }
  } catch (error) {
    console.error("Error fetching applicant:", error);
    res.status(500).json({ error: "Error fetching applicant" });
  }
});

// Update an applicant by ID
router.put("/:id", async (req: Request, res: Response) => {
  logRequest(req);
  const { id } = req.params;
  try {
    console.log(`Validating input data`);
    const validatedData = await editApplicantSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true, 
    });

    console.log(`Updating applicant with ID: ${id}`);
    const updatedApplicant = await prisma.applicant.update({
      where: { applicant_id: Number(id) },
      data: validatedData,
    });

    console.log(`Applicant with ID ${id} updated`);
    res.json(applicantSerializer(updatedApplicant));
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      // If validation fails
      res.status(400).json({
        error: "Validation error",
        details: error.errors, // Array of validation error messages
      });
    } else {
      console.error("Error updating applicant:", error);
      res.status(400).json({ error: "Error updating applicant" });
    }
  }
});

// Delete an applicant by ID
router.delete("/:id", async (req: Request, res: Response) => {
  logRequest(req);
  const { id } = req.params;
  try {
    console.log(`Deleting applicant with ID: ${id}`);
    await prisma.applicant.delete({
      where: { applicant_id: Number(id) },
    });
    console.log(`Applicant with ID ${id} deleted`);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting applicant:", error);
    res.status(400).json({ error: "Error deleting applicant" });
  }
});

export default router;