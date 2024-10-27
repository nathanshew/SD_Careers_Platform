import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { logRequest } from "../utils/logUtil";

const prisma = new PrismaClient();
const router = Router();

// Define the type for applicant input
interface ApplicantInput {
  username: string;
  email: string;
  password: string;
}

// Create a new applicant
router.post("/", async (req: Request<{}, {}, ApplicantInput>, res: Response) => {
  logRequest(req);
  const { username, email, password } = req.body;
  try {
    console.log(`Creating applicant with email: ${email}`);
    const applicant = await prisma.applicant.create({
      data: { username, email, password },
    });
    console.log(`Applicant created with ID: ${applicant.applicant_id}`);
    res.status(201).json(applicant);
  } catch (error) {
    console.error("Error creating applicant:", error);
    res.status(400).json({ error: "Error creating applicant" });
  }
});

// Get all applicants
router.get("/", async (_req: Request, res: Response) => {
  logRequest(_req);
  try {
    console.log("Fetching all applicants");
    const applicants = await prisma.applicant.findMany();
    res.json(applicants);
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
      res.json(applicant);
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
router.put("/:id", async (req: Request<{ id: string }, {}, ApplicantInput>, res: Response) => {
  logRequest(req);
  const { id } = req.params;
  const { username, email, password } = req.body;
  try {
    console.log(`Updating applicant with ID: ${id}`);
    const updatedApplicant = await prisma.applicant.update({
      where: { applicant_id: Number(id) },
      data: { username, email, password },
    });
    console.log(`Applicant with ID ${id} updated`);
    res.json(updatedApplicant);
  } catch (error) {
    console.error("Error updating applicant:", error);
    res.status(400).json({ error: "Error updating applicant" });
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
