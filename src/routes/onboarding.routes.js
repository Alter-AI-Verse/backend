import express from "express";
import { saveOnboardingData } from "../controllers/onboarding.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyJWT, saveOnboardingData);

export default router;
