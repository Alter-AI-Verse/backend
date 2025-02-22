import mongoose, { Schema } from "mongoose";

const NotificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ['subscription', 'chatbot', 'file', 'system'],
      required: true,
    },
    message: { 
        type: String, 
        required: true,
    },
    isRead: { 
        type: Boolean, 
        default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Notification = mongoose.model("Notification", NotificationSchema);
