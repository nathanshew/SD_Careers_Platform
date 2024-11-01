import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { logRequest } from "../utils/logUtil";

const prisma = new PrismaClient();
const router = Router();

// Define the type for admin input
interface AdminInput {
  username: string;
  email: string;
  password: string;
}

// Create a new admin
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
router.post("/", async (req: Request<{}, {}, AdminInput>, res: Response) => {
  logRequest(req);
  const { username, email, password } = req.body;
  try {
    console.log(`Creating admin with email: ${email}`);
    const admin = await prisma.admin.create({
      data: { username, email, password },
    });
    console.log(`Admin created with ID: ${admin.admin_id}`);
    res.status(201).json(admin);
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(400).json({ error: "Error creating admin" });
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
router.put("/:id", async (req: Request<{ id: string }, object, AdminInput>, res: Response) => {
  logRequest(req);
  const { id } = req.params;
  const { username, email, password } = req.body;
  try {
    console.log(`Updating admin with ID: ${id}`);
    const updatedAdmin = await prisma.admin.update({
      where: { admin_id: Number(id) },
      data: { username, email, password },
    });
    console.log(`Admin with ID ${id} updated`);
    res.json(updatedAdmin);
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(400).json({ error: "Error updating admin" });
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