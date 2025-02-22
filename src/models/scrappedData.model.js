import mongoose, { Schema } from "mongoose";

const ScrapedDataSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        chatbotId: {
            type: Schema.Types.ObjectId,
            ref: 'ChatBot',
            required: false,
        },
        sourceType: {
            type: String,
            enum: ['linkedin', 'twitter', 'facebook', 'website', 'job_portal', 'other'],
            required: true,
        },
        sourceUrl: {
            type: String,
            required: true,
        },
        rawContent: {
            type: Schema.Types.Text,
            required: true,
        },
        structuredData: {
            type: Schema.Types.Mixed,
            required: false,
        },
        lastScrapedAt: {
            type: Date,
            default: Date.now,
        },
        updateFrequency: {
            type: String,
            enum: ['daily', 'weekly', 'monthly', 'manual'],
            default: 'manual',
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
    },
    {
        timestamps: true,
    }
);

export const ScrapedData = mongoose.model("ScrapedData", ScrapedDataSchema);
