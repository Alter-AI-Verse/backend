import { FileStorage } from "../models/fileStorage.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import fs from "fs";

const uploadCV = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "No File Uploaded");
  }

  const { path, mimetype, size, originalname } = req.file;

  const newFile = new FileStorage({
    userId: req.user._id,
    fileName: originalname,
    fileType: mimetype,
    fileSizeMB: (size / (1024 * 1024)).toFixed(2),
    storagePath: path,
    storageProvider: "local",
  });

  await newFile.save();

  res.status(201).json({ message: "CV uploaded successfully!", file: newFile });
});

const uploadPortfolio = asyncHandler(async (req, res) => {
  const { portfolioLinks } = req.body;
  if (!portfolioLinks || !Array.isArray(portfolioLinks)) {
    return res.status(400).json({ message: "Invalid portfolio links format." });
  }

  res
    .status(201)
    .json({ message: "Portfolio links saved successfully!", portfolioLinks });
});

const getUploadedFiles = asyncHandler(async (req, res) => {
  const files = await FileStorage.find({
    userId: req.user._id,
    isDeleted: false,
  });
  res.status(200).json({ files });
});

const deleteFile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const file = await FileStorage.findById(id);
  if (!file) {
    return res.status(404).json({ message: "File not found." });
  }

  file.isDeleted = true;
  file.deletedAt = new Date();
  await file.save();

  res.status(200).json({ message: "File deleted successfully." });
});


export {
    uploadCV,
    uploadPortfolio,
    getUploadedFiles,
    deleteFile,
};