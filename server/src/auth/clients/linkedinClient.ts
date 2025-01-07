import * as client from "openid-client";
import assert from "assert";

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

let config: client.Configuration | null = null; // Cache (Singleton Pattern)

export default async function getLinkedInConfig() {
  if (!config) {
    config = await client.discovery(server, client_id, client_secret);
    console.log("LinkedIn configuration discovered");
  }

  return config;
}
