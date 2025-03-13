import session from 'express-session';
import assert from "assert";

assert(process.env.SESSION_SECRET, "Environment variable SESSION_SECRET must be defined.");

const session_secret: string = process.env.SESSION_SECRET; // SESSION Secret

// Extend SessionData inline
declare module 'express-session' {
  interface SessionData {
    // OAuth login verification
    code_verifier?: string;
    state?: string;
    redirect_to_frontend?: string;
    redirect_to_frontend_verified_signup?: string;

    // Set password
    verifiedData?: {
      username: string;
      email: string;
    }

    // Sign up verification
    verificationData?: {
      code: string;
      username: string;
      email: string;
    };
    
  }
}

// Create session
const sessionMiddleware = session({
  secret: session_secret,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    httpOnly: true,
    secure: false, // Set to true in production
    maxAge: 5 * 60 * 1000 // 5 minutes (in milliseconds)
  }, 
});

export { sessionMiddleware };