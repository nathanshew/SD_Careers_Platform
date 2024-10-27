import { Request } from "express";

// Helper function to log request information
export function logRequest(req: Request) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
}