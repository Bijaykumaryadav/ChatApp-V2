// chatSockets.js
const Chat = require("../models/messageSchema");
require("dotenv").config();

module.exports.chatSockets = function (socketServer) {
  const io = require("socket.io")(socketServer, {
    pingTimeout: 60000,
    cors: {
      origin: [process.env.FRONTEND_URL],
    },
  });

  io.sockets.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Setup user connection and join user-specific room
    socket.on("setup", (userData) => {
      socket.join(userData.id); // Join a room with the user ID
      socket.emit("connected");
    });

    // Join specific chat room
    socket.on("joinChat", (room) => {
      socket.join(room); // Join the room by chatId
      console.log(`User joined room: ${room}`);
    });

    // Typing indicators
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stopTyping", (room) => socket.in(room).emit("stopTyping"));

    // Listen for new messages
    socket.on("newMessage", async (newMessageRec) => {
      const chatId = newMessageRec.chat._id;

      if (!newMessageRec.chat || !newMessageRec.chat.participants) {
        return console.log("Chat or participants not defined in message.");
      }

      // Emit new message to all users in the chat room
      io.in(chatId).emit("messageReceived", newMessageRec);

      // Update latestMessage in the database
      try {
        await Chat.findByIdAndUpdate(chatId, { latestMessage: newMessageRec._id });
      } catch (error) {
        console.log("Error updating latestMessage:", error);
      }
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};
