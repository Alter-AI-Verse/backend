import axios from "axios";
import {Conversation} from "../models/conversation.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const AI_SERVER_URL = process.env.AI_SERVER_URL;

const sendMessage = asyncHandler(async (req, res) => {
    const { chatbotId, message } = req.body;

    if (!chatbotId || !message) {
        throw new ApiError(400, "Chatbot ID and message are required.");
    }

    const aiResponse = await axios.post(`${AI_SERVER_URL}/ai/generate-response`, {
        chatbotId,
        message
    });

    const sentimentAnalysis = await axios.post(`${AI_SERVER_URL}/ai/analyze-sentiment`, {
        message
    });

    const newMessage = {
        sender: "user",
        message,
        sentiment: sentimentAnalysis.data.sentiment
    };

    const botReply = {
        sender: "bot",
        message: aiResponse.data.response,
        sentiment: "neutral"
    };

    let conversation = await Conversation.findOne({ userId: req.user._id, chatbotId });

    if (!conversation) {
        conversation = new Conversation({
            userId: req.user._id,
            chatbotId,
            messages: [newMessage, botReply]
        });
    } else {
        conversation.messages.push(newMessage, botReply);
    }

    await conversation.save();

    res.status(200).json({
        chatbotResponse: aiResponse.data.response,
        sentiment: sentimentAnalysis.data.sentiment
    });
});

const getConversation = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const conversation = await Conversation.findById(id);
    
    if (!conversation) {
        throw new ApiError(404, "Conversation not found.");
    }

    res.status(200).json(conversation);
});

const getAllConversations = asyncHandler(async (req, res) => {
    const conversations = await Conversation.find({ 
        userId: req.user._id }, 
        "_id chatbotId lastInteraction"
    );
    res.status(200).json({ conversations });
});

const deleteConversation = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const conversation = await Conversation.findById(id);

    if (!conversation) {
        throw new ApiError(404, "Conversation not found.");
    }

    conversation.sessionActive = false;
    await conversation.save();

    res.status(200).json({ message: "Conversation deleted successfully." });
});

const fetchScrapedData = asyncHandler(async (req, res) => {
    const { userId } = req.user;

    const scrapedData = await axios.get(`${AI_SERVER_URL}/ai/fetch-scraped-data?userId=${userId}`);
    
    res.status(200).json(scrapedData.data);
});

const trainChatbot = asyncHandler(async (req, res) => {
    const { chatbotId, knowledgeData } = req.body;

    if (!chatbotId || !knowledgeData) {
        throw new ApiError(400, "Chatbot ID and knowledge data are required.");
    }

    const trainingResponse = await axios.post(`${AI_SERVER_URL}/ai/train-chatbot`, {
        chatbotId,
        knowledgeData
    });

    res.status(200).json(trainingResponse.data);
});

const getChatbotAnalytics = asyncHandler(async (req, res) => {
    const analyticsData = await axios.get(`${AI_SERVER_URL}/ai/get-knowledgebase?chatbotId=${req.query.chatbotId}`);
    res.status(200).json(analyticsData.data);
});

export {
    sendMessage,
    getConversation,
    getAllConversations,
    deleteConversation,
    fetchScrapedData,
    trainChatbot,
    getChatbotAnalytics,
};
