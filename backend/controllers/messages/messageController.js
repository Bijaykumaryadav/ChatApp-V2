const Chat = require("../models/messageSchema");
const User = require("../models/userSchema");
const { sendResponse } = require("../../utils/sendResponse");


// Send a message in an existing chat or create a new chat
// Send a message in an existing chat or create a new chat
module.exports.sendMessage = async function (req, res) {
  const { chatId, content } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into the request");
    return sendResponse(res, 400, false, "Invalid request data");
  }

  const newMessage = {
    sender: req.user.id,
    content,
  };

  try {
    // Find the chat by ID and push the new message into the messages array
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { messages: newMessage }, latestMessage: newMessage },
      { new: true }
    )
      .populate("participants", "name profileImage")
      .populate("messages.sender", "name profileImage")
      .populate("latestMessage");

    if (!chat) {
      return sendResponse(res, 404, false, "Chat not found");
    }

    sendResponse(res, 200, true, "Message sent successfully", { chat });
  } catch (error) {
    console.log("Error in sending message", error);
    sendResponse(res, 500, false, "Internal Server Error", {}, { error });
  }
};

// Fetch all messages for a specific chat
module.exports.fetchAllMessages = async function (req, res) {
  try {
    const chat = await Chat.findById(req.params.chatId)
      .populate("participants", "name profileImage")
      .populate("messages.sender", "name profileImage email")
      .populate("latestMessage");

    if (!chat) {
      return sendResponse(res, 404, false, "Chat not found");
    }

    sendResponse(res, 200, true, "Messages fetched successfully", {
      messages: chat.messages,
      latestMessage: chat.latestMessage,
    });
  } catch (error) {
    console.log("Error in fetching all messages", error);
    sendResponse(res, 500, false, "Internal Server Error", {}, { error });
  }
};
