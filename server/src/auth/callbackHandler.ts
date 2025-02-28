import { Request, Response } from "express";
import * as client from "openid-client";
import jwt from "jsonwebtoken";
import assert from "assert";
import { PrismaClient } from "@prisma/client";
import { APPLICANT_ROLE } from "../constants.js";

assert(
  process.env.JWT_SECRET,
  "Environment variable JWT_SECRET must be defined."
);

const prisma = new PrismaClient();
const jwt_secret: string = process.env.JWT_SECRET; // JWT Secret

export default async function callbackHandler(
  req: Request,
  res: Response,
  config: client.Configuration
) {
  const currentUrl = new URL(
    `${req.protocol}://${req.get("host")}${req.originalUrl}`
  );

  //   Exchange the authorization code for tokens
  if (
    !req.session.code_verifier ||
    !req.session.state ||
    !req.session.redirect_to_frontend
  ) {
    throw new Error("Session is invalid or missing required attributes");
  }

  const checks: Record<string, string> = {
    expectedState: req.session.state,
  };

  if (config.serverMetadata().supportsPKCE()) {
    checks.pkceCodeVerifier = req.session.code_verifier; // Retrieve from session
  }

  const tokenResponse = await client.authorizationCodeGrant(
    config,
    currentUrl,
    checks
  );

  // Decode the ID token to get the user email and name
  const id_token = tokenResponse.id_token;
  if (!id_token) {
    throw new Error("OAuth 2.0/OIDC token response does not contain id token");
  }

  const decoded_id_token = jwt.decode(id_token) as {
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

  const existingApplicant = await prisma.applicant.findUnique({
    where: { email: email }, // Query based on email
  });

  if (!existingApplicant) {
    // Save verified applicant info in session
    req.session.verifiedData = {
      username: name,
      email: email
    };

    // Redirect applicant to set password
    const redirect_uri_set_password = `${req.session.redirect_to_frontend_verified_signup}?username=${name}&email=${email}`;
    res.redirect(redirect_uri_set_password);
    return;
  }

  // Generate JWT for the applicant. No Expiry on JWT
  const payload = { email: email, role: APPLICANT_ROLE };
  const token = jwt.sign(payload, jwt_secret, { noTimestamp: true });

  const redirect_uri = `${req.session.redirect_to_frontend}?token=${token}&username=${name}&email=${email}`;
  res.redirect(redirect_uri);
  console.log(`Generated jwt for email: ${email}`);
  req.session.destroy(() => {}); // Clean up the session after use
}
