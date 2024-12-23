const Chat = require("../../models/chatSchema");
const Message = require("../../models/messageSchema");
const User = require("../../models/userSchema");
const { sendResponse } = require("../../utils/sendResponse");
module.exports.sendMessage = async function (req, res) {
  const { chatId, content } = req.body;
  if (!content || !chatId) {
    console.log("Invalid data passed into the request");
    return res.status(400).send("Internal Server Error");
  }
  var newMessage = {
    sender: req.user.id,
    content: content,
    chat: chatId,
  };
  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name profileImage");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name email profileImage",
    });

    // console.log("message is:",message);

    await Chat.findOneAndUpdate({ _id: chatId }, { latestMessage: message });
    res.status(200).send(message);
  } catch (error) {
    console.log("Error in sending message", error);
    res.status(400).send("Internal Server Error");
  }
};

module.exports.fetchAllMessages = async function (req, res) {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name profileImage email")
      .populate("chat");
      // console.log("fetch message is:",messages);

    res.status(200).send(messages);
  } catch (error) {
    console.log(`Error in fetching all the message ${error}`);
    res.status(400).send("Internal Server Error !");
  }
};
