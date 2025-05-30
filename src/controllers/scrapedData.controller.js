import { ScrapedData } from "../models/scrappedData.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const saveScrapedData = asyncHandler(async (req, res) => {
  const { userId, platform, sourceUrl, scrapedContent } = req.body;

  if (!userId || !platform || !sourceUrl || !scrapedContent) {
    throw new ApiError(400, "Invalid data received from AI server.");
  }

  let existingData = await ScrapedData.findOne({
    userId,
    sourceType: platform,
  });

  if (existingData) {
    existingData.rawContent = JSON.stringify(scrapedContent);
    existingData.lastScrapedAt = Date.now();
    await existingData.save();

    return res.status(200).json({
      message: `Updated scraped data for ${platform}.`,
      data: existingData,
    });
  }

  const newScrapedData = new ScrapedData({
    userId,
    sourceType: platform,
    sourceUrl,
    rawContent: JSON.stringify(scrapedContent),
    isProcessed: false,
  });

  await newScrapedData.save();

  res.status(201).json({
    message: `Scraped data for ${platform} saved successfully!`,
    data: newScrapedData,
  });
});

export const getAllScrapedData = asyncHandler(async (req, res) => {
  const { platform } = req.query;
  const userId = req.user._id;

  let query = { userId };
  if (platform) {
    query.sourceType = platform;
  }

  const scrapedData = await ScrapedData.find(query).sort({ lastScrapedAt: -1 });

  if (!scrapedData || scrapedData.length === 0) {
    return res.status(404).json({ message: "No scraped data found." });
  }

  res.status(200).json({ scrapedData });
});

export const getScrapedData = asyncHandler(async (req, res) => {
    const { url, website_type } = req.body;
  
    if (!url || !website_type) {
      throw new ApiError(400, "URL and website type are required.");
    }
  
    let failedScrapes = [];
  
    try {
      const response = await axios.post(`/`, {
        url,
        website_type,
      });
  
      const scraped_data = new ScrapedData({
        userId: req.user._id,
        sourceType: website_type,
        sourceUrl: url,
        rawContent: response.data,
        lastScrapedAt: new Date(),
      });
  
      await scraped_data.save();
  
      res.status(201).json({
        message: `Data Scraping successful for ${website_type}`,
        scrapedData: response.data,
        failedScrapes,
      });
  
    } catch (error) {
      console.error(`❌ Scraping failed for ${website_type}:`, error.message);
      failedScrapes.push(website_type);
  
      res.status(500).json({
        message: `Scraping failed for ${website_type}`,
        error: error.message,
        failedScrapes,
      });
    }
  });