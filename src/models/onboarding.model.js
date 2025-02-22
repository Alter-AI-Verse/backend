import mongoose, { Schema } from "mongoose";

const OnboardingSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        socialLinks: {
            linkedin: { type: String },
            facebook: { type: String },
            instagram: { type: String },
            twitter: { type: String },
            github: { type: String },
            website: { type: String },
        },
        uploadedFiles: [
            {
                fileName: { type: String },
                fileType: { type: String },
                fileSize: { type: Number },
                filePath: { type: String },
            },
        ],
        additionalInfo: {
            type: String,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Onboarding = mongoose.model("Onboarding", OnboardingSchema);
