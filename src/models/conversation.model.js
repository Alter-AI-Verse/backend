import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema({
    sender: {
        type: String,
        enum: ['user', 'bot'],
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    messageType: {
        type: String,
        enum: ['text', 'image', 'video', 'audio'],
        default: 'text',
    },
    sentiment: {
        type: String,
        enum: ['positive', 'neutral', 'negative'],
        default: 'neutral',
    },
    responseTime: {
        type: Number,
        default: 0,
    },
    readStatus: {
        type: Boolean,
        default: false,
    },
    attachments: [
        {
            fileName: { type: String },
            fileType: { type: String },
            fileSize: { type: Number },
            filePath: { type: String },
        }
    ],
},
{
    timestamps: true,
});

const ConversationSchema = new Schema(
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
        messages: [MessageSchema],
        sessionActive: {
            type: Boolean,
            default: true,
        },
        totalMessages: {
            type: Number,
            default: 0,
        },
        lastInteraction: {
            type: Date,
            default: Date.now,
        },
        conversationType: {
            type: String,
            enum: ['one-on-one', 'group'],
            default: 'one-on-one',
        },
        conversationSummary: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

export const Conversation = mongoose.model("Conversation", ConversationSchema);
