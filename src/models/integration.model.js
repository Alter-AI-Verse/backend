import mongoose, { Schema } from "mongoose";

const IntegrationSchema = new Schema(
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
        platform: {
            type: String,
            enum: ['slack', 'discord', 'whatsapp', 'telegram'],
            required: true,
        },
        apiCredentials: {
            clientId: { 
                type: String, 
                required: true,
            },
            clientSecret: { 
                type: String, 
                required: true,
            },
            accessToken: { 
                type: String, 
                required: true,
            },
            refreshToken: { 
                type: String, 
                required: false,
            },
        },
        autoRetry: {
            type: Boolean,
            default: true,
        },
        retryAttempts: {
            type: Number,
            default: 0,
        },
        maxRetries: {
            type: Number,
            default: 3,
        },
        rateLimit: {
            requestsPerMinute: { 
                type: Number, 
                default: 60,
            },
            lastRequestTime: { 
                type: Date, 
                default: Date.now,
            },
        },
        webhookUrl: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
        lastSyncedAt: {
            type: Date,
            default: Date.now,
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
            }
        ],
    },
    {
        timestamps: true,
    }
);

export const Integration = mongoose.model('Integration', IntegrationSchema);
