import express from "express";
import {
    sendMessage,
    getConversation,
    getAllConversations,
    deleteConversation,
    fetchScrapedData,
    trainChatbot,
    getChatbotAnalytics
} from "../controllers/chatbot.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/message", verifyJWT, sendMessage);
router.get("/conversation/:id", verifyJWT, getConversation);
router.get("/conversations", verifyJWT, getAllConversations);
router.delete("/conversation/:id", verifyJWT, deleteConversation);
router.get("/scraped-data", verifyJWT, fetchScrapedData);
router.post("/train", verifyJWT, trainChatbot);
router.get("/analytics", verifyJWT, getChatbotAnalytics);

export default router;
