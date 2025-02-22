import axios from "axios";
import { Onboarding } from "../models/onboarding.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const AI_SERVER_URL = process.env.AI_SERVER_URL;

export const saveOnboardingData = asyncHandler(async (req, res) => {
    const { socialLinks } = req.body;

    if (!socialLinks || Object.keys(socialLinks).length === 0) {
        throw new ApiError(400, "At least one social link is required.");
    }

    const onboardingData = new Onboarding({
        userId: req.user._id,
        socialLinks,
        isCompleted: true,
    });

    await onboardingData.save();

    const scrapeRequests = Object.entries(socialLinks)
        .filter(([platform, url]) => url)
        .map(([platform, url]) =>
            axios.post(`${AI_SERVER_URL}/scrape`, {
                userId: req.user._id,
                platform,
                url
            })
        );

    const results = await Promise.allSettled(scrapeRequests);
    const failedScrapes = results
        .filter(result => result.status === "rejected")
        .map((_, index) => Object.keys(socialLinks)[index]);

    res.status(201).json({ 
        message: "Onboarding completed. Scraping initiated!", 
        onboardingData,
        failedScrapes
    });
});
