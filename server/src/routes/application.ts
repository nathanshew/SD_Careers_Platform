import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { createApplicationSchema, editApplicationSchema } from "../validators/application.js";
import { logRequest } from "../utils/logUtil.js";
import * as yup from 'yup';

const prisma = new PrismaClient();
const router = Router();

// Create a new application
router.post("/", async (req: Request, res: Response) => {
  logRequest(req);
  try {
    console.log(`Validating input data`);
    const validatedData = await createApplicationSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true, // Required to prevent mass assignment vulnerabilities
    });

    console.log(`Creating application with Job id: ${validatedData.job_id} and Application id: ${validatedData.applicant_id}`);
    const application = await prisma.application.create({
      data: validatedData,
    });

    console.log(`Application created with ID: ${application.application_id}`);
    res.status(201).json(application);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      // If validation fails
      res.status(400).json({
        error: "Validation error",
        details: error.errors, // Array of validation error messages
      });
    } else {
      console.error("Error creating application:", error);
      res.status(400).json({ error: "Error creating application" });
    }
  }
});

// Get all applications
router.get("/", async (_req: Request, res: Response) => {
  logRequest(_req);
  try {
    console.log("Fetching all applications");
    const applications = await prisma.application.findMany();
    res.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Error fetching applications" });
  }
});

// Get a single application by ID
router.get("/:id", async (req: Request, res: Response) => {
  logRequest(req);
  const { id } = req.params;
  try {
    console.log(`Fetching application with ID: ${id}`);
    const application = await prisma.application.findUnique({
      where: { application_id: Number(id) },
    });
    if (application) {
      console.log(`Application with ID ${id} found`);
      res.json(application);
    } else {
      console.warn(`Application with ID ${id} not found`);
      res.status(404).json({ error: "Application not found" });
    }
  } catch (error) {
    console.error("Error fetching application:", error);
    res.status(500).json({ error: "Error fetching application" });
  }
});

// Update an application by ID
router.put("/:id", async (req: Request, res: Response) => {
  logRequest(req);
  const { id } = req.params;
  try {
    console.log(`Validating input data`);
    const validatedData = await editApplicationSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true, // Required to prevent mass assignment vulnerabilities
    });

    console.log(`Updating application with ID: ${id}`);
    const updatedApplicant = await prisma.application.update({
      where: { application_id: Number(id) },
      data: validatedData,
    });

    console.log(`Application with ID ${id} updated`);
    res.json(updatedApplicant);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      // If validation fails
      res.status(400).json({
        error: "Validation error",
        details: error.errors, // Array of validation error messages
      });
    } else {
      console.error("Error updating application:", error);
      res.status(400).json({ error: "Error updating application" });
    }
  }
});

// Delete an application by ID
router.delete("/:id", async (req: Request, res: Response) => {
  logRequest(req);
  const { id } = req.params;
  try {
    console.log(`Deleting application with ID: ${id}`);
    await prisma.application.delete({
      where: { application_id: Number(id) },
    });
    console.log(`Application with ID ${id} deleted`);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(400).json({ error: "Error deleting application" });
  }
});

export default router;