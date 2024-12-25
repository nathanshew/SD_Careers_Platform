import session from 'express-session';
import assert from "assert";

assert(process.env.SESSION_SECRET, "Environment variable SESSION_SECRET must be defined.");

const session_secret: string = process.env.SESSION_SECRET; // SESSION Secret

// Extend SessionData inline
declare module 'express-session' {
  interface SessionData {
    code_verifier?: string;
    state?: string;
    redirect_to_frontend?: string;
  }
}

// Create session
const sessionMiddleware = session({
  secret: session_secret,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // Set to true in production
});

export { sessionMiddleware };