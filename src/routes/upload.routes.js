import express from "express";
import {upload} from "../middlewares/multer.middleware.js";
import { uploadDocs } from "../middlewares/multer.middleware.js";
import { uploadCV, uploadPortfolio, getUploadedFiles, deleteFile } from "../controllers/upload.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/cv", verifyJWT, uploadDocs.single("cv"), uploadCV);
router.post("/portfolio", verifyJWT, uploadPortfolio);
router.get("/files", verifyJWT, getUploadedFiles);
router.delete("/file/:id", verifyJWT, deleteFile);

export default router;
