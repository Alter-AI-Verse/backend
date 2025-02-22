import express from "express";
import { fetchScrapedData, getAllScrapedData } from "../controllers/scrapedData.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:platform", verifyJWT, fetchScrapedData);
router.get("/", verifyJWT, getAllScrapedData);

export default router;
