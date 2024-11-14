const Chat = require("../models/messageSchema");
require("dotenv").config();

module.exports.chatSockets = function (socketServer) {
  const io = require("socket.io")(socketServer, {
    pingTimeout: 60000,
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:8000", 
    },
  });

  io.sockets.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // User setup on login/join
    socket.on("setup", (userData) => {
      if (!userData || !userData._id) {
        console.log("Invalid user data received for setup:", userData);
        return;
      }
      socket.join(userData._id);
      socket.emit("connected");
      console.log("User setup complete for:", userData._id);
    });

    // Join a specific chat room
    socket.on("joinChat", (room) => {
      if (!room) {
        console.log("No room specified for joinChat event");
        return;
      }
      socket.join(room);
      console.log(`User joined the room: ${room}`);
    });

    // Typing indicators
    socket.on("typing", (room) => {
      if (room) socket.in(room).emit("typing");
    });
    socket.on("stopTyping", (room) => {
      if (room) socket.in(room).emit("stopTyping");
    });

    // Listen for new messages
    socket.on("newMessage", async(newMessageRec) => {
      var chat = newMessageRec.chat;
      if (!chat.users) {
        console.log(`chat users not defined`);
        return;
      }
      // to braodcast to all the users of the room expect the sender
      io.to(chat._id).emit("messageRecieved", newMessageRec);

      // Save latest message in the chat collection if needed
      try {
        await Chat.findByIdAndUpdate(chat._id, {
          latestMessage: newMessageRec._id,
        });
        console.log("Updated latestMessage for chat:", chat._id);
      } catch (error) {
        console.log("Error updating latestMessage:", error);
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};
