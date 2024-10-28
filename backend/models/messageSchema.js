const mongoose = require("mongoose");

// Define the Chat schema
const messageSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        content: {
          type: String,
          trim: true,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ["sent", "delivered", "read"],
          default: "sent",
        },
        attachments: [
          {
            type: String,
            required: false,
          },
        ],
      },
    ],
    latestMessage: {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      content: String,
      timestamp: { type: Date, default: Date.now },
    },
  },
  { timestamps: true }
);

// Create a model from the schema
const Chat = mongoose.model("Chat", messageSchema);

module.exports = Chat;
