import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { createAdminSchema, editAdminSchema } from "../validators/admin";
import { logRequest } from "../utils/logUtil";
import * as yup from 'yup';

const prisma = new PrismaClient();
const router = Router();

// Create a new admin
router.post("/", async (req: Request, res: Response) => {
  logRequest(req);
  try {
    console.log(`Validating input data`);
    const validatedData = await createAdminSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true, // Required to prevent mass assignment vulnerabilities
    });

    console.log(`Creating admin with email: ${validatedData.email}`);
    const admin = await prisma.admin.create({
      data: validatedData,
    });

    console.log(`Admin created with ID: ${admin.admin_id}`);
    res.status(201).json(admin);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      // If validation fails
      res.status(400).json({
        error: "Validation error",
        details: error.errors, // Array of validation error messages
      });
    } else {
      // Log the error on the server
      console.error("Error creating admin:", error);

      // Send a JSON error response to the client
      res.status(400).json({ error: "Error creating admin" });
    }
  }
});

// Get all admins
router.get("/", async (_req: Request, res: Response) => {
  logRequest(_req);
  try {
    console.log("Fetching all admins");
    const admins = await prisma.admin.findMany();
    res.json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ error: "Error fetching admins" });
  }
});

// Get a single admin by ID
router.get("/:id", async (req: Request, res: Response) => {
  logRequest(req);
  const { id } = req.params;
  try {
    console.log(`Fetching admin with ID: ${id}`);
    const admin = await prisma.admin.findUnique({
      where: { admin_id: Number(id) },
    });
    if (admin) {
      console.log(`Admin found: ${admin.username}`);
      res.json(admin);
    } else {
      console.warn(`Admin with ID ${id} not found`);
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    console.error("Error fetching admin:", error);
    res.status(500).json({ error: "Error fetching admin" });
  }
});

// Update an admin by ID
router.put("/:id", async (req: Request, res: Response) => {
  logRequest(req);
  const { id } = req.params;
  try {
    console.log(`Validating input data`);
    const validatedData = await editAdminSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true, // Required to prevent mass assignment vulnerabilities
    });

    console.log(`Updating admin with ID: ${id}`);
    const updatedAdmin = await prisma.admin.update({
      where: { admin_id: Number(id) },
      data: validatedData,
    });

    console.log(`Admin with ID ${id} updated`);
    res.json(updatedAdmin);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      // If validation fails
      res.status(400).json({
        error: "Validation error",
        details: error.errors, // Array of validation error messages
      });
    } else {
      console.error("Error updating admin:", error);
      res.status(400).json({ error: "Error updating admin" });
    }
  }
});

// Delete an admin by ID
router.delete("/:id", async (req: Request, res: Response) => {
  logRequest(req);
  const { id } = req.params;
  try {
    console.log(`Deleting admin with ID: ${id}`);
    await prisma.admin.delete({
      where: { admin_id: Number(id) },
    });
    console.log(`Admin with ID ${id} deleted`);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(400).json({ error: "Error deleting admin" });
  }
});

export default router;