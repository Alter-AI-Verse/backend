import express from "express";
import { saveScrapedData, getAllScrapedData } from "../controllers/scrapedData.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/save", verifyJWT, saveScrapedData);
router.get("/scraped-data", verifyJWT, getAllScrapedData);

export default router;
