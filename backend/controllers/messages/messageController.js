// controllers/chatController.js
const Chat = require("../../models/chatSchema");
const Message = require("../../models/messageSchema");
const User = require("../../models/userSchema");
const { sendResponse } = require("../../utils/sendResponse");

module.exports.sendMessage = async (req, res, io) => {
  const { chatId, content } = req.body;

  console.log(req.body);

  if (!content || !chatId) {
    console.log("Invalid data in request");
    return sendResponse(res, 400, false, "Invalid request data");
  }

  const newMessage = {
    sender: req.user.id,
    content,
    chat: chatId,
  };

  console.log(newMessage);

  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name profileImage");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name email profileImage",
    });

    // Update the latestMessage in the Chat document
   await Chat.findOneAndUpdate({ _id: chatId }, { latestMessage: message });

      // console.log("Chat Details is",chat);


    sendResponse(res, 200, true, "Message sent successfully", { message });
  } catch (error) {
    console.log("Error in sending message", error);
    sendResponse(res, 500, false, "Internal Server Error", {}, { error });
  }
};

module.exports.fetchAllMessages = async (req, res) => {

  try {
    // Check if the chat exists
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name profileImage email")
      .populate("chat")
      .sort({ createdAt: 1 }); // Sort messages by creation time


    sendResponse(res, 200, true, "Messages fetched successfully", { messages });
  } catch (error) {
    console.log("Error in fetching all messages", error);
    sendResponse(res, 500, false, "Internal Server Error", {}, { error });
  }
};
