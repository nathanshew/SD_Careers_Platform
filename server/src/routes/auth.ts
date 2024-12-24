import { Router, Request, Response } from "express";
import { sessionMiddleware } from "../middleware/sessionMiddleware.js";
import { logRequest } from "../utils/logUtil.js";
import { googleCallBackHandler, googleLoginHandler } from "../auth/clients/googleClient.js";
import { linkedinCallBackHandler, linkedinLoginHandler } from "../auth/clients/linkedinClient.js";

const router = Router();

// Google Login & Callback
router.get("/google/login", sessionMiddleware, async (req: Request, res: Response) => {
  logRequest(req);
  const redirect_uri = `${req.protocol}://${req.get("host")}/auth/google/callback`;
  googleLoginHandler(req, res, redirect_uri);
});

router.get("/google/callback", sessionMiddleware, googleCallBackHandler);

// Linkedin Login & Callback
router.get("/linkedin/login", sessionMiddleware, async (req: Request, res: Response) => {
  logRequest(req);
  const redirect_uri = `${req.protocol}://${req.get("host")}/auth/linkedin/callback`;
  linkedinLoginHandler(req, res, redirect_uri);
});

router.get("/linkedin/callback", sessionMiddleware, linkedinCallBackHandler);

export default router;
