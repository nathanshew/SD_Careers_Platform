import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import * as client from "openid-client";
import session from 'express-session';
import jwt from "jsonwebtoken";
import assert from "assert";
import { logRequest } from "../utils/logUtil.js";
import { decodeGoogleIdToken } from "../utils/authUtil.js";

// Assertions for type safety
assert(process.env.GOOGLE_URL, "Environment variable GOOGLE_URL must be defined.");
assert(process.env.GOOGLE_CLIENT_ID, "Environment variable GOOGLE_CLIENT_ID must be defined.");
assert(process.env.GOOGLE_CLIENT_SECRET, "Environment variable GOOGLE_CLIENT_SECRET must be defined.");
assert(process.env.JWT_SECRET, "Environment variable JWT_SECRET must be defined.");
assert(process.env.SESSION_SECRET, "Environment variable SESSION_SECRET must be defined.");

const router = Router();
const prisma = new PrismaClient();

// Google Login Configuration
const server: URL = new URL(process.env.GOOGLE_URL); // Authorization Server's Issuer Identifier
const client_id: string = process.env.GOOGLE_CLIENT_ID; // Client identifier at the Authorization Server
const client_secret: string = process.env.GOOGLE_CLIENT_SECRET; // Client Secret
const jwt_secret: string = process.env.JWT_SECRET; // JWT Secret
const session_secret: string = process.env.SESSION_SECRET; // SESSION Secret

let config!: client.Configuration;

// Extend SessionData inline
declare module 'express-session' {
  interface SessionData {
    code_verifier?: string;
    state?: string;
  }
}

// Create session
const sessionMiddleware = session({
  secret: session_secret,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // Set to true in production
});

(async () => {
  // Discover Google's OpenID configuration
  config = await client.discovery(server, client_id, client_secret);
  console.log("Google configuration discovered");
})();

router.get("/login", sessionMiddleware, async (req: Request, res: Response) => {
  logRequest(req);
  const code_verifier = client.randomPKCECodeVerifier();
  const state = client.randomState();

  // Store code_verifier and state in the session
  req.session.code_verifier = code_verifier;
  req.session.state = state;

  // Create parameters
  const code_challenge = await client.calculatePKCECodeChallenge(code_verifier);
  const parameters: Record<string, string> = {
    redirect_uri: `${req.protocol}://${req.get("host")}/auth/callback`,
    scope: "email profile",
    code_challenge: code_challenge,
    code_challenge_method: "S256",
    state: state,
  };

  // Redirect the user to redirectTo.href
  const redirectTo: URL = client.buildAuthorizationUrl(config, parameters);
  console.log("Redirecting User to Google Sign-In Page");
  res.redirect(redirectTo.href);
});

router.get("/callback", sessionMiddleware, async (req: Request, res: Response) => {
  try {
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
      throw new Error("OAuth 2.0/OIDC token response does not contain id token")
    }
    const decoded_id_token = await decodeGoogleIdToken(id_token, client_id) as {
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
      email: email
    });
    console.log(`Applicant with email: ${email} logged in`);

    // Clean up the session after use
    req.session.destroy(() => {});
  } catch (error) {
    console.error("Error during callback:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
