import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "../interface/jwtPayLoad.js";
import { PrismaClient } from "@prisma/client";
import { APPLICANT_ROLE, ADMIN_ROLE } from "../constants.js";
import assert from "assert";
import jwt from "jsonwebtoken";

assert(
  process.env.JWT_SECRET,
  "Environment variable JWT_SECRET must be defined."
);

const prisma = new PrismaClient();

// Middleware to extract and verify JWT
export default async function jwtMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: "Authorization header missing" });
      return;
    }
  
    // Assuming the header is in the format "Bearer <token>"
    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "Token missing" });
      return;
    }
  
    try {
      // Verify token using the secret key from environment variables
      const secret = process.env.JWT_SECRET as string;
      const decoded = jwt.verify(token, secret) as JwtPayload;
      let sender_id;

      switch (decoded.role) {
        case APPLICANT_ROLE: {
          const applicant = await prisma.applicant.findUnique({
            where: { email: decoded.email },
          });
      
          if (!applicant) {
            res.status(401).json({ error: "Invalid token" });
            return;
          }
          sender_id = applicant.applicant_id;
          break;
        }
        case ADMIN_ROLE: {
          const admin = await prisma.admin.findUnique({
            where: { email: decoded.email },
          });
      
          if (!admin) {
            res.status(401).json({ error: "Invalid token" });
            return;
          }
          sender_id = admin.admin_id;
          break;
        }
        default:
          res.status(401).json({ error: "Invalid token" });
          return;
      }
      
      // pass along decoded values
      res.locals.sender_id = sender_id; 
      res.locals.role = decoded.role;
      next();
    } catch (error) {
      console.error("Error authenticating:", error);
      res.status(401).json({ error: "Invalid token" });
      return;
    }
  }