import mongoose, { Schema } from "mongoose";

const DashboardSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        chatbotId: {
            type: Schema.Types.ObjectId,
            ref: 'ChatBot',
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
        totalSessions: {
            type: Number,
            default: 0,
        },
        activeUsers: {
            type: Number,
            default: 0,
        },
        userRetentionRatePercentage: {
            type: Number,
            default: 0,
        },
        subscriptionStatus: {
            type: String,
            enum: ['free', 'basic', 'standard', 'premium'],
            default: 'free',
        },
        fileUploads: {
            totalFiles: { 
                type: Number, 
                default: 0,
            },
            totalStorageUsedMB: { 
                type: Number, 
                default: 0,
            },
        },
        knowledgeBaseUsage: {
            totalEntries: { 
                type: Number, 
                default: 0,
            },
            lastUpdated: { 
                type: Date, 
                default: Date.now,
            },
        },
        chatbotPerformance: {
            averageResponseTime: { 
                type: Number, 
                default: 0,
            },
            mostUsedFeature: { 
                type: String, 
                default: "",
            },
        },
        sentimentAnalysis: {
            positive: { 
                type: Number, 
                default: 0,
            },
            neutral: { 
                type: Number, 
                default: 0,
            },
            negative: { 
                type: Number, 
                default: 0,
            },
        },
        apiUsage: {
            totalApiCalls: { 
                type: Number, 
                default: 0,
            },
            failedRequests: { 
                type: Number, 
                default: 0,
            },
            lastApiCall: { 
                type: Date, 
                default: Date.now,
            },
        },
        lastActivity: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

export const Dashboard = mongoose.model('Dashboard', DashboardSchema);
