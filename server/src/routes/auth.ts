import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Applicant } from '@prisma/client';
import { signUpSchema, loginSchema, verifySchema, verifiedSignUpSchema } from "../validators/auth.js";
import { logRequest } from "../utils/logUtil.js";
import { generateVerificationCode } from "../utils/authUtil.js";
import { applicantSerializer } from "../serializers/applicant.js";
import { sessionMiddleware } from "../middleware/sessionMiddleware.js";
import { JwtPayload } from "../interface/jwtPayLoad.js";
import { APPLICANT_ROLE } from "../constants.js";
import  getGoogleConfig  from "../auth/clients/googleClient.js";
import getLinkedInConfig from "../auth/clients/linkedinClient.js";
import loginHandler from "../auth/loginHandler.js";
import callbackHandler from "../auth/callbackHandler.js";
import jwt from "jsonwebtoken";
import assert from "assert";
import nodemailer from "nodemailer";
import bcrypt from 'bcryptjs';
import * as yup from 'yup';

assert(
  process.env.NODEMAILER_SERVICE,
  "Environment variable NODEMAILER_SERVICE must be defined."
);
assert(
  process.env.NODEMAILER_USER,
  "Environment variable NODEMAILER_USER must be defined."
);
assert(
  process.env.NODEMAILER_PASS,
  "Environment variable NODEMAILER_PASS must be defined."
);
assert(
  process.env.JWT_SECRET,
  "Environment variable JWT_SECRET must be defined."
);

const router = Router();
const prisma = new PrismaClient();
const jwt_secret: string = process.env.JWT_SECRET; // JWT Secret

const transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
})

// Google Login & Callback
router.get(
  "/google/login",
  sessionMiddleware,
  async (req: Request, res: Response) => {
    try {
      const config = await getGoogleConfig()
      const redirect_uri = `${req.protocol}://${req.get("host")}/auth/google/callback`;
      await loginHandler(req, res, redirect_uri, config);
    } catch (error) {
      console.error("Error during Google login:", error);
      res.status(500).json({ error: "Failed to initiate login process" });
    }
  }
);

router.get(
  "/google/callback",
  sessionMiddleware,
  async (req: Request, res: Response) => {
    try {
      const config = await getGoogleConfig()
      await callbackHandler(req, res, config);
    } catch (error) {
      console.error("Error during callback from Google:", error);
      res.status(500).json({ error: "Login failed" });
    }
  }
);

// Linkedin Login & Callback
router.get(
  "/linkedin/login",
  sessionMiddleware,
  async (req: Request, res: Response) => {
    try {
      const config = await getLinkedInConfig()
      const redirect_uri = `${req.protocol}://${req.get("host")}/auth/linkedin/callback`;
      await loginHandler(req, res, redirect_uri, config);
    } catch (error) {
      console.error("Error during LinkedIn login:", error);
      res.status(500).json({ error: "Failed to initiate login process" });
    }
  }
);

router.get(
  "/linkedin/callback",
  sessionMiddleware,
  async (req: Request, res: Response) => {
    try {
      const config = await getLinkedInConfig()
      await callbackHandler(req, res, config);
    } catch (error) {
      console.error("Error during callback from LinkedIn:", error);
      res.status(500).json({ error: "Login failed" });
    }
  }
);

// Manual Signup Auth
router.post(
  "/signup",
  sessionMiddleware,
  async (req: Request, res: Response) => {
    logRequest(req);
      try {
        console.log(`Validating input data`);
        const validatedData = await signUpSchema.validate(req.body, {
          abortEarly: false,
          stripUnknown: true, 
        });

        console.log(`Verifying unique applicant`);
        if (await prisma.applicant.findUnique({where: {email: validatedData.email}})) {
          console.log("Applicant with this email already exist");
          res.status(404).json({ error: "Applicant with this email already exist" });
          return;
        }
    
        console.log(`Saving applicant info in session`);
        const code = generateVerificationCode();
        req.session.verificationData = {
          code: code,
          username: validatedData.username,
          email: validatedData.email,
        };
        const htmlMessage = `
            <h2>Your verification number is: <strong>${code}</strong></h2>
            <p>Expires in 5 minutes.</p>
        `;
        const mailOptions = {
          from: process.env.NODEMAILER_USER,
          to: validatedData.email,
          subject: 'NUS Fintech Society Careers - Email Verification',
          html: htmlMessage
        };

        console.log(`Sending applicant verification email`);
        await transporter.sendMail(mailOptions);

        console.log(`Verification email sent to ${validatedData.email}`);
        res.status(250).json({ message: "Verification email sent" });
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          // If validation fails
          res.status(400).json({
            error: "Validation error",
            details: error.errors, // Array of validation error messages
          });
        } else {
          console.error("Error in sending verification email to applicant", error);
          res.status(400).json({ error: "Error in sending verification email to applicant" });
        }
      }
  }
);

router.post("/verify", sessionMiddleware,  async (req: Request, res: Response) => {
  logRequest(req);
  try {
    console.log(`Validating input data`);
    const validatedData = await verifySchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true, 
    });

    if (!req.session.verificationData) {
      res.status(400).json({ error: "No verification session found. Please sign up again." });
      return;
    }

    const { code: storedCode, username, email } = req.session.verificationData;

    if (validatedData.code !== storedCode) {
      res.status(400).json({ error: "Invalid verification code" });
      return;
    }

    // Set the verified data for the next step
    req.session.verifiedData = { username, email };

    // Return success without creating the user yet
    res.status(200).json({ message: "Verification successful" });
  
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      // If validation fails
      res.status(400).json({
        error: "Validation error",
        details: error.errors, // Array of validation error messages
      });
    } else {
      console.error("Error verifying code:", error);
      res.status(500).json({ error: "Error verifying the code" });
    }
  }
});

router.post("/verifiedSignup", sessionMiddleware,  async (req: Request, res: Response) => {
  logRequest(req);
  try {
    console.log(`Validating input data`);
    const validatedData = await verifiedSignUpSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true, 
    });

    if (!req.session.verifiedData) {
      res.status(400).json({ error: "No verified session found. Please sign up again." });
      return;
    }

    const { username, email } = req.session.verifiedData;

    if (validatedData.username !== username || validatedData.email !== email) {
      res.status(400).json({ error: "User info does not match verified info" });
      return;
    }

    console.log(`Creating applicant in the database`);
    const applicant = await prisma.applicant.create({
        data: { username, email, password: await bcrypt.hash(validatedData.password, 10) },
    });

    console.log(`Applicant created with ID: ${applicant.applicant_id}`);
    const payload: JwtPayload = { email, role: APPLICANT_ROLE };
    const token = jwt.sign(payload, jwt_secret, { noTimestamp: true });
    res.status(201).json({ message: "Verified sign-up successful", token, ...applicantSerializer(applicant) });
    req.session.destroy(() => {}); // Clean up the session after use
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      // If validation fails
      res.status(400).json({
        error: "Validation error",
        details: error.errors, // Array of validation error messages
      });
    } else {
      console.error("Error with verified sign-up:", error);
      res.status(500).json({ error: "Error with verified sign-up" });
    }
  }
});

router.post("/signin", async (req: Request, res: Response) => {
  logRequest(req);
  try {
    console.log(`Validating input data`);
    const validatedData = await loginSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true, 
    });

    const existingApplicant: Applicant | null = await prisma.applicant.findUnique({where: {email: validatedData.email}});

      if (!existingApplicant) {
        res.status(404).json({ error: "Applicant not found" });
        return;
      }

      const passwordMatch = await bcrypt.compare(validatedData.password, existingApplicant.password);
      if (!passwordMatch) {
          res.status(401).json({ error: "Invalid password" });
          return;
      }

      const payload: JwtPayload = { email: validatedData.email, role: APPLICANT_ROLE };
      const token = jwt.sign(payload, jwt_secret, { noTimestamp: true });
      console.log(`${existingApplicant.username} signin successful`);
      res.status(200).json({ message: "Signin successful", token, ...applicantSerializer(existingApplicant) });

  } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
