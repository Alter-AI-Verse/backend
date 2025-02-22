import mongoose, { Schema } from "mongoose";

const AnalyticsSchema = new Schema(
    {
        chatbotId: {
            type: Schema.Types.ObjectId,
            ref: "ChatBot",
            required: true,
        },
        totalConversations: {
            type: Number,
            default: 0,
        },
        totalMessages: {
            type: Number,
            default: 0,
        },
        uniqueUsers: {
            type: Number,
            default: 0,
        },
        averageResponseTime: {
            type: Number,
            default: 0,
        },
        sentimentTrends: {
            positive: { 
                type: Number, default: 0 
            },
            neutral: { 
                type: Number, default: 0 
            },
            negative: { 
                type: Number, default: 0 
            },
        },
        topUsedKeywords: [
            {
                keyword: { 
                    type: String 
                },
                count: { 
                    type: Number, 
                    default: 0,
                },
            }
        ],
        peakUsageTime: [
            {
                hour: { 
                    type: Number, 
                },
                count: { 
                    type: Number, 
                    default: 0,
                },
            }
        ]
    },
    {
        timestamps: true,
    }
);

export const Analytics = mongoose.model("Analytics", AnalyticsSchema);
