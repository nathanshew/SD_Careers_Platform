import { Request, Response } from "express";
import * as client from "openid-client";

export default async function loginHandler(
  req: Request,
  res: Response,
  redirect_uri: string,
  config: client.Configuration
) {
  const code_verifier = client.randomPKCECodeVerifier();
  const state = client.randomState();

  // Store code_verifier and state in the session
  req.session.code_verifier = code_verifier;
  req.session.state = state;

  // Create parameters
  const code_challenge = await client.calculatePKCECodeChallenge(code_verifier);
  const parameters: Record<string, string> = {
    redirect_uri: redirect_uri,
    scope: "openid email profile",
    code_challenge: code_challenge,
    code_challenge_method: "S256",
    state: state,
  };

  // Redirect the user to redirectTo.href
  const redirectTo: URL = client.buildAuthorizationUrl(config, parameters);
  res.redirect(redirectTo.href);
}
