import axios from "axios";
import {ScrapedData} from "../models/scrappedData.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";

const AI_SERVER_URL = process.env.AI_SERVER_URL;

export const fetchScrapedData = asyncHandler(async (req, res) => {
    const { platform } = req.params; 
    const { userId } = req.user;
    const { url } = req.body;

    if (!platform) {
        throw new ApiError(400, "Platform is required.");
    }

    const scrapedResponse = await axios.get(`${AI_SERVER_URL}/scrape/${platform}?url=${url}`);

    if (!scrapedResponse.data || scrapedResponse.data.length === 0) {
        throw new ApiError(404, `No data found for ${platform}`);
    }

    const newScrapedData = new ScrapedData({
        userId,
        chatbotId: req.body.chatbotId || null,
        sourceType: platform,
        rawContent: JSON.stringify(scrapedResponse.raw_data),
        isProcessed: false,
    });

    await newScrapedData.save();

    res.status(201).json({
        message: `Scraped data for ${platform} saved successfully!`,
        data: newScrapedData,
    });
});

export const getAllScrapedData = asyncHandler(async (req, res) => {
    const { userId } = req.user;

    const scrapedData = await ScrapedData.find({ userId });

    res.status(200).json({ scrapedData });
});
