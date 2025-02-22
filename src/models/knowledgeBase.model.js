import mongoose, { Schema } from "mongoose";

const KnowledgeBaseSchema = new Schema(
    {
        userId:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        chatbotId: {
            type: Schema.Types.ObjectId,
            ref: 'ChatBot',
            required: true,
        },
        sourceType:{
            type: String,
            enum:['social_media', 'resume', 'portfolio', 'manual_input', 'web_scraping'],
            required: true,
        },
        content:{
            type: Schema.Types.Text,
            required: true
        },
        processedData:[
            {
                key: {
                    type: String,
                    required: true,
                },
                value: {
                    type: Schema.Types.Mixed,
                    required: true,
                },
            }
        ],
        uploadedFiles:[
            {
                fileName: {
                    type: String,
                },
                fileType: {
                    type: String,
                },
                fileSize:{
                    type: Number,
                },
                filePath:{
                    type: String,
                },
            },
        ],
        status:{
            type: String,
            enum: ['pending', 'processed', 'rejected'],
            default: 'pending',
        }
    },
    {
        timestamps: true,
    }
);

export const KnowledgeBase = mongoose.model('KnowledgeBase', KnowledgeBaseSchema); 