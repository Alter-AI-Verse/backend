import {Onboarding} from "../models/onboarding.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";

export const saveOnboardingData = asyncHandler(async (req, res) => {
    const { socialLinks, uploadedFiles, additionalInfo } = req.body;

    const onboardingData = new Onboarding({
        userId: req.user._id,
        socialLinks,
        uploadedFiles,
        additionalInfo,
        isCompleted: true,
    });

    await onboardingData.save();

    res.status(201).json({ message: "Onboarding data saved successfully!", onboardingData });
});
