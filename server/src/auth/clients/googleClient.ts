import { Request, Response } from "express";
import * as client from "openid-client";
import assert from "assert";
import jwt, { JwtPayload } from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import { loginHandler } from "../loginHandler.js";
import { callbackHandler } from "../callbackHandler.js";

// Assertions for type safety
assert(
  process.env.GOOGLE_URL,
  "Environment variable GOOGLE_URL must be defined."
);
assert(
  process.env.GOOGLE_CLIENT_ID,
  "Environment variable GOOGLE_CLIENT_ID must be defined."
);
assert(
  process.env.GOOGLE_CLIENT_SECRET,
  "Environment variable GOOGLE_CLIENT_SECRET must be defined."
);

// Google Login Configuration
const server: URL = new URL(process.env.GOOGLE_URL); // Authorization Server's Issuer Identifier
const client_id: string = process.env.GOOGLE_CLIENT_ID; // Client identifier at the Authorization Server
const client_secret: string = process.env.GOOGLE_CLIENT_SECRET; // Client Secret
let config!: client.Configuration;

(async () => {
  config = await client.discovery(server, client_id, client_secret);
  console.log("Google configuration discovered");
})();

export async function googleLoginHandler(
  req: Request,
  res: Response,
  redirect_uri: string
) {
  try {
    loginHandler(req, res, redirect_uri, config);
    console.log("Redirected User to Google Sign-In Page");
  } catch (error) {
    console.error("Error during Google login:", error);
    res.status(500).json({ error: "Failed to initiate login process" });
  }
}

export async function googleCallBackHandler(req: Request, res: Response) {
  try {
    callbackHandler(req, res, config, decodeGoogleIdToken);
    console.log("Callback succesful");
  } catch (error) {
    console.error("Error during callback from google:", error);
    res.status(500).json({ error: "Login failed" });
  }
}

// Function to verify and decode Google ID Token
async function decodeGoogleIdToken(idToken: string): Promise<JwtPayload> {
  // Fetch Google's public keys
  const GOOGLE_JWKS_URL = "https://www.googleapis.com/oauth2/v3/certs";
  const response = await fetch(GOOGLE_JWKS_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch JWKS: ${response.statusText}`);
  }
  const { keys } = await response.json();

  // Decode the token header to get 'kid'
  const decodedHeader = jwt.decode(idToken, { complete: true });
  if (
    !decodedHeader ||
    typeof decodedHeader === "string" ||
    !decodedHeader.header.kid
  ) {
    throw new Error("Invalid token header");
  }
  const kid = decodedHeader.header.kid;

  // Find the corresponding public key
  const publicKey_JWS = keys.find((k: any) => k.kid === kid);
  const publicKey = jwkToPem(publicKey_JWS); // Convert the JWKS key to PEM format
  if (!publicKey) throw new Error("No matching public key found");

  // Verify the token
  const payload = jwt.verify(idToken, publicKey, {
    algorithms: ["RS256"],
    audience: client_id,
    issuer: "https://accounts.google.com",
  }) as JwtPayload;
  return payload;
}
