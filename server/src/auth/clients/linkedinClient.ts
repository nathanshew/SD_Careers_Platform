import { Request, Response } from "express";
import * as client from "openid-client";
import assert from "assert";
import loginHandler from "../loginHandler.js";
import callbackHandler from "../callbackHandler.js";

// High-level declarations
const issuer: string = "https://www.linkedin.com/oauth";

// Assertions for type safety
assert(
  process.env.LINKEDIN_CLIENT_ID,
  "Environment variable LINKEDIN_CLIENT_ID must be defined."
);
assert(
  process.env.LINKEDIN_CLIENT_SECRET,
  "Environment variable LINKEDIN_CLIENT_SECRET must be defined."
);

// LinkedIn Login Configuration
const server: URL = new URL(issuer); // Authorization Server's Issuer Identifier
const client_id: string = process.env.LINKEDIN_CLIENT_ID; // Client identifier at the Authorization Server
const client_secret: string = process.env.LINKEDIN_CLIENT_SECRET; // Client Secret
let config!: client.Configuration;

(async () => {
  try {
    config = await client.discovery(server, client_id, client_secret);
    console.log("LinkedIn configuration discovered");
  } catch (error) {
    console.error("Failed to discover LinkedIn configuration:", error);
  }
})();

export async function linkedinLoginHandler(
  req: Request,
  res: Response,
  redirect_uri: string
) {
  try {
    await loginHandler(req, res, redirect_uri, config);
    console.log("Redirected User to LinkedIn Sign-In Page");
  } catch (error) {
    console.error("Error during LinkedIn login:", error);
    res.status(500).json({ error: "Failed to initiate login process" });
  }
}

export async function linkedinCallBackHandler(req: Request, res: Response) {
  try {
    await callbackHandler(req, res, config);
    console.log("Callback succesful");
  } catch (error) {
    console.error("Error during callback from linkedin:", error);
    res.status(500).json({ error: "Login failed" });
  }
}
