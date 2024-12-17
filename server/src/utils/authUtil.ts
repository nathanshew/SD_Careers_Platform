import jwt, { JwtPayload } from "jsonwebtoken";
import assert from "assert";
import jwkToPem from "jwk-to-pem";

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

// Function to verify and decode Google ID Token
export async function decodeGoogleIdToken(idToken: string, clientId: string) {
  // Fetch Google's public keys
  const keys = await getGooglePublicKeys();

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
  const publicKey = getKeyFromJWKS(keys, kid);
  if (!publicKey) {
    throw new Error("Unable to find matching public key");
  }

  // Verify the token
  const payload = jwt.verify(idToken, publicKey, {
    algorithms: ["RS256"],
    audience: clientId,
    issuer: "https://accounts.google.com",
  }) as JwtPayload;
  return payload;
}

// Helper Function

// Function to fetch Google JWKS using fetch
async function getGooglePublicKeys(): Promise<any[]> {
  const GOOGLE_JWKS_URL = "https://www.googleapis.com/oauth2/v3/certs";
  const response = await fetch(GOOGLE_JWKS_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch JWKS: ${response.statusText}`);
  }
  const { keys } = await response.json();
  return keys;
}

// Function to find the public key that matches the 'kid'
function getKeyFromJWKS(keys: any[], kid: string): string | undefined {
  const key = keys.find((k) => k.kid === kid);
  if (!key) throw new Error("No matching key found");
  return jwkToPem(key); // Convert the JWKS key to PEM format
}

