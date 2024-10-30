// controllers/messages/chatController.js
// controllers/chatController.js
const User = require("../../models/userSchema");
const Chat = require("../../models/chatSchema");
const Message = require("../../models/messageSchema");
const { sendResponse } = require("../../utils/sendResponse");

module.exports.oneToOneChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId not sent with the request");
    return sendResponse(res, 400, false, "User ID is required");
  }

  const user = await User.findById(userId);
  if (!user) {
    return sendResponse(res, 200, true, "User Id sent Successfully");
  }

  var isChat = await Chat.find({
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name profileImage email",
  });

  if (isChat.length > 0) {
    return res.status(200).json(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      return sendResponse(res, 200, true, "Chat created", fullChat);
    } catch (error) {
      console.error("Error in creating/finding chat:", error);
      return sendResponse(
        res,
        500,
        false,
        "Internal Server Error",
        {},
        { error }
      );
    }
  }
};

module.exports.fetchChat = async (req, res) => {
  try {
    const results = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .exec();

    const populatedChats = await User.populate(results, {
      path: "latestMessage.sender",
      select: "name profileImage email",
    });
    console.log(populatedChats);

    return sendResponse(
      res,
      200,
      true,
      "Chats fetched successfully",
      populatedChats
    );
  } catch (error) {
    console.error("Error in fetching chats:", error);
    return sendResponse(
      res,
      500,
      false,
      "Internal Server Error",
      {},
      { error }
    );
  }
};
