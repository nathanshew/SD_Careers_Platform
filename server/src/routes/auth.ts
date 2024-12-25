import { Router, Request, Response } from "express";
import { sessionMiddleware } from "../middleware/sessionMiddleware.js";
import  getGoogleConfig  from "../auth/clients/googleClient.js";
import getLinkedInConfig from "../auth/clients/linkedinClient.js";
import loginHandler from "../auth/loginHandler.js";
import callbackHandler from "../auth/callbackHandler.js";

const router = Router();

// Google Login & Callback
router.get(
  "/google/login",
  sessionMiddleware,
  async (req: Request, res: Response) => {
    try {
      const config = await getGoogleConfig()
      const redirect_uri = `${req.protocol}://${req.get("host")}/auth/google/callback`;
      loginHandler(req, res, redirect_uri, config);
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
      loginHandler(req, res, redirect_uri, config);
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

export default router;
