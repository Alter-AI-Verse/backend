import mongoose, { Schema } from "mongoose";

const ScrapedDataSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        sourceType: {
            type: String,
            enum: ["linkedin", "twitter", "facebook", "instagram", "github", "website", "job_portal", "other"],
            required: true,
        },
        sourceUrl: {
            type: String,
            required: true,
        },
        rawContent: {
            type: Schema.Types.Mixed,
            required: true,
        },
        lastScrapedAt: {
            type: Date,
            default: Date.now,
        },
        updateFrequency: {
            type: String,
            enum: ["daily", "weekly", "monthly", "manual"],
            default: "manual",
        },
        isProcessed: {
            type: Boolean,
            default: false,
        },
        errorLogs: [
            {
                errorMessage: { 
                    type: String,
                },
                timestamp: { 
                    type: Date, 
                    default: Date.now,
                },
            },
        ],
        failedScrapes: [String],
    },
    {
        timestamps: true,
    }
);

export const ScrapedData = mongoose.model('ScrapedData', ScrapedDataSchema)