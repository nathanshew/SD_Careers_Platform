import jwt from "jsonwebtoken";
import assert from "assert";

// Function to decrypt server's JWT
export function decrypt_jwt(token: string) {
  assert(process.env.JWT_SECRET, "Environment variable JWT_SECRET must be defined.");
  const jwt_secret: string = process.env.JWT_SECRET; // JWT Secret
  const decoded = jwt.verify(token, jwt_secret) as {
    email?: string;
    role?: string;
  };

  if (!decoded.email || !decoded.role) {
    throw new Error("JWT supplied has missing fields")
  }
  return decoded.email, decoded.role
}

// Function to generate a 6-digit verification code as a string.
export function generateVerificationCode(): string {
  return Math.floor(Math.random() * 1000000).toString();
}


