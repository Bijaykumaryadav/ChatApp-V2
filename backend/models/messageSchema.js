const mongoose = require("mongoose");

// Define the Chat schema
const messageSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, // Ensure that at least one participant is present
      },
    ],
    messages: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true, // Ensure that sender is always provided
        },
        content: {
          type: String,
          trim: true,
          required: true, // Ensure that content is not empty
        },
        timestamp: {
          type: Date,
          default: Date.now, // Automatically set the timestamp to now
        },
        status: {
          type: String,
          enum: ["sent", "delivered", "read"], // Message status options
          default: "sent", // Default status when message is sent
        },
        attachments: [
          {
            type: String, // URL or path to the attachment
            required: false,
          },
        ],
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message", // Reference to the latest message
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Create a model from the schema
const Chat = mongoose.model("Chat", messageSchema);

module.exports = Chat;
