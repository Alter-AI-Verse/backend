import axios from "axios";
import {Conversation} from "../models/conversation.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { ChatBot } from "../models/chatbot.model.js";

const AI_SERVER_URL = process.env.AI_SERVER_URL;

const sendMessage = asyncHandler(async (req, res) => {
    const { chatbotId, query: message} = req.body;
    console.log(typeof chatbotId,chatbotId)
    if (!chatbotId || !message) {
        throw new ApiError(400, "Chatbot ID and message are required.");
    }

    const aiResponse = await axios.post(`${AI_SERVER_URL}/chat`, {
        chatbotId,
        query,
        // knowledgeBase
    });

    const sentimentAnalysis = await axios.post(`${AI_SERVER_URL}/ai/analyze-sentiment`, {
        message
    });

    const newMessage = {
        sender: "user",
        message,
        // sentiment: sentimentAnalysis.data.sentiment
    };

    const botReply = {
        sender: "bot",
        message: "test",
        sentiment: "neutral"
    };

    let conversation = await Conversation.findOne({ userId: req.user._id, chatbotId });
    return res.status(200).json({message:'hello'})

});

const getConversation = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const conversation = await Conversation.findById(id).populate("userId", "fullName")
    if (!conversation) {
        throw new ApiError(404, "Conversation not found.");
    }

    const updatedMessages = conversation.messages.map(msg => ({
        ...msg.toObject(),
        senderFullName: msg.sender === "user" ? conversation.userId.fullName : "Chatbot"
    }));

    res.status(200).json({
        ...conversation.toObject(),
        messages: updatedMessages
    });
});


const getAllConversations = asyncHandler(async (req, res) => {
    const { userId } = req.user._id;
    const conversations = await Conversation.find(userId);
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

const createChatbot = asyncHandler(async (req, res) => {
    const { botName, description } = req.body;

    if (!botName) {
        throw new ApiError(400, "Bot name is required.");
    }

    const newChatbot = new ChatBot({
        userId: req.user._id,
        botName,
        description,
    });

    await newChatbot.save();

    res.status(201).json({
        message: "Chatbot created successfully!",
        chatbot: newChatbot,
        publicLink: `https://www.alter.ai/bot/${newChatbot.publicLink}`
    });
});

const interactWithPublicBot = asyncHandler(async (req, res) => {
    const { publicLink } = req.params;
    const { message } = req.body;

    if (!message) {
        throw new ApiError(400, "Message is required.");
    }

    const chatbot = await ChatBot.findOne({ publicLink });
    if (!chatbot) {
        throw new ApiError(404, "Chatbot not found.");
    }

    const aiResponse = await axios.post(`${AI_SERVER_URL}/ai/generate-response`, {
        chatbotId: chatbot._id,
        message,
    });

    res.status(200).json({
        chatbotResponse: aiResponse.data.response
    });
});

export {
    sendMessage,
    getConversation,
    getAllConversations,
    deleteConversation,
    fetchScrapedData,
    trainChatbot,
    getChatbotAnalytics,
    createChatbot,
    interactWithPublicBot
};
