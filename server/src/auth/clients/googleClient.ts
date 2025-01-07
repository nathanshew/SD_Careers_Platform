import { Request, Response } from "express";
import * as client from "openid-client";
import assert from "assert";
import loginHandler from "../loginHandler.js";
import callbackHandler from "../callbackHandler.js";

// High-level declarations
const issuer: string = "https://accounts.google.com";

// Assertions for type safety
assert(
  process.env.GOOGLE_CLIENT_ID,
  "Environment variable GOOGLE_CLIENT_ID must be defined."
);
assert(
  process.env.GOOGLE_CLIENT_SECRET,
  "Environment variable GOOGLE_CLIENT_SECRET must be defined."
);

// Google Login Configuration
const server: URL = new URL(issuer); // Authorization Server's Issuer Identifier
const client_id: string = process.env.GOOGLE_CLIENT_ID; // Client identifier at the Authorization Server
const client_secret: string = process.env.GOOGLE_CLIENT_SECRET; // Client Secret

let config: client.Configuration | null = null; // Cache (Singleton Pattern)

export default async function getGoogleConfig() {
  if (!config) {
    config = await client.discovery(server, client_id, client_secret);
    console.log("Google configuration discovered");
  }

  return config;
}
