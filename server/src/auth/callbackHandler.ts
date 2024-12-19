import { Request, Response } from "express";
import * as client from "openid-client";
import jwt, { JwtPayload } from "jsonwebtoken";
import assert from "assert";
import { PrismaClient } from "@prisma/client";

assert(
  process.env.JWT_SECRET,
  "Environment variable JWT_SECRET must be defined."
);

const prisma = new PrismaClient();
const jwt_secret: string = process.env.JWT_SECRET; // JWT Secret

export async function callbackHandler(
  req: Request,
  res: Response,
  config: client.Configuration,
  decodeFunction: (id_token: string) => Promise<JwtPayload>
) {
  const currentUrl = new URL(
    `${req.protocol}://${req.get("host")}${req.originalUrl}`
  );

  // Exchange the authorization code for tokens
  if (!req.session.code_verifier || !req.session.state) {
    res
      .status(400)
      .json({ error: "Session is invalid or missing required attributes" });
    return;
  }
  const tokenResponse = await client.authorizationCodeGrant(
    config,
    currentUrl,
    {
      pkceCodeVerifier: req.session.code_verifier, // Retrieve from session
      expectedState: req.session.state,
    }
  );
  console.log("Token Received");

  // Decode the ID token to get the user email and name
  const id_token = tokenResponse.id_token;
  if (!id_token) {
    throw new Error("OAuth 2.0/OIDC token response does not contain id token");
  }
  const decoded_id_token = (await decodeFunction(id_token)) as {
    email?: string;
    name?: string;
  };
  const email = decoded_id_token?.email;
  if (!email) {
    throw new Error("Failed to extract email from ID token");
  }
  const name = decoded_id_token?.name;
  if (!name) {
    throw new Error("Failed to extract name from ID token");
  }

  // Add applicant to database if needed
  const existingApplicant = await prisma.applicant.findUnique({
    where: { email: email }, // Query based on email
  });
  if (!existingApplicant) {
    console.log(`Creating applicant with email: ${email}`);
    await prisma.applicant.create({
      data: {
        username: name,
        email: email,
      },
    });
    res.status(201);
  }

  // Generate JWT for the applicant. No Expiry on JWT
  const payload = { email: email, role: "applicant" };
  const token = jwt.sign(payload, jwt_secret, { noTimestamp: true });
  res.json({
    token: token,
    username: name,
    email: email,
  });
  console.log(`Applicant with email: ${email} logged in`);

  // Clean up the session after use
  req.session.destroy(() => {});
}
