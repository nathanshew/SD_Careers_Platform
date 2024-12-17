import { Router, Request, Response } from "express";
import * as client from "openid-client";
import jwt from "jsonwebtoken";
import assert from "assert";

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
assert(
  process.env.JWT_SECRET,
  "Environment variable JWT_SECRET must be defined."
);

const router = Router();
const server: URL = new URL(process.env.GOOGLE_URL); // Authorization Server's Issuer Identifier
const client_id: string = process.env.GOOGLE_CLIENT_ID; // Client identifier at the Authorization Server
const client_secret: string = process.env.GOOGLE_CLIENT_SECRET; // Client Secret
const jwt_secret: string = process.env.JWT_SECRET; // JWT Secret

let config!: client.Configuration;

(async () => {
  // Discover Google's OpenID configuration
  const client = await import("openid-client");
  config = await client.discovery(server, client_id, client_secret);
  console.log("Google configuration discovered");
})();

router.get("/login", async (req: Request, res: Response) => {
  const code_verifier = client.randomPKCECodeVerifier();
  const state = client.randomState();

  // Store codeVerifier and state in the session
  req.session.code_verifier = code_verifier;
  req.session.state = state;

  // Create parameters
  const code_challenge = await client.calculatePKCECodeChallenge(code_verifier);
  const parameters: Record<string, string> = {
    redirect_uri: `${req.protocol}://${req.get("host")}/callback`,
    scope: "openid email",
    code_challenge: code_challenge,
    code_challenge_method: "S256",
  };

  // now redirect the user to redirectTo.href
  const redirectTo: URL = client.buildAuthorizationUrl(config, parameters);
  console.log("redirecting to", redirectTo.href);
  res.redirect(redirectTo.href);
});

router.get("/callback", async (req: Request, res: Response) => {
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
    console.log("Token Response:", tokenResponse);

    // // Get the user information
    // const userInfoResponse = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
    //   method: 'GET',
    //   headers: {
    //     Authorization: `Bearer ${tokenResponse.access_token}`,
    //   },
    // });

    // const userInfo = await userInfoResponse.json();

    // console.log('User Info:', userInfo);
    // Return the user's email as the response
    // res.json({
    //   message: 'Login successful',
    //   email: userInfo.email,
    // });

     // Decode the ID token to get the user email
     const idToken = tokenResponse.id_token;
     assert(idToken)
     const decodedIdToken = jwt.decode(idToken) as { email?: string };
 
     const email = decodedIdToken?.email;
     if (!email) {
       throw new Error("Failed to extract email from ID token");
     }
 
     console.log("User Email:", email);
 
     // Generate JWT for the application
     const payload = { email, role: "applicant" };
     const appToken = jwt.sign(payload, jwt_secret, { noTimestamp: true });
 
     res.json({ token: appToken });

    // Clean up the session after use
    req.session.destroy(() => {
      console.log("Session destroyed after successful login");
    });
  } catch (error) {
    console.error("Error during callback:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;