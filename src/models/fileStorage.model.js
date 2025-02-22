import mongoose, { Schema } from "mongoose";

const FileStorageSchema = new Schema(
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
        fileName: {
            type: String,
            required: true,
        },
        fileType: {
            type: String,
            required: true,
        },
        fileSizeMB: {
            type: Number,
            required: true,
        },
        storagePath: {
            type: String,
            required: true,
        },
        storageProvider: {
            type: String,
            enum: ['local', "aws_s3", 'firebase', 'google_drive'],
            default: 'local',
        },
        accessLevel: {
            type: String,
            enum: ['private', 'public', 'restricted'],
            default: 'private',
        },
        uploadedAt: {
            type: Date,
            default: Date.now,
        },
        lastAccessedAt: {
            type: Date,
            default: Date.now,
        },
        expiryDate: {
            required: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        isSafe: {
            type: String,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

export const FileStorage = mongoose.model("FileStorage", FileStorageSchema);
