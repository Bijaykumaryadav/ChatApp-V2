import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessageArray } from "../../features/chat/chatSlice";
import Util from "../../helpers/Util";
import { toast } from "react-toastify";
import useSocket from "../hooks/useSocket";
import { FaArrowLeft } from "react-icons/fa";
import MessageContainer from "./MessageContainer"; // Import the MessageContainer

const ChatContainer = ({ chat, onContactProfileClick, onBackClick }) => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const messages = useSelector((state) => state.chat.messages);
  const currentUser = useSelector((state) => state.auth.userInfo);
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);

  const fetchAllMessages = async () => {
    try {
      const messageUri = `chats/message/${chat._id}`;
      await Util.call_get_with_uri_param(
        messageUri,
        (data, success) => {
          if (success && data.messages) {
            dispatch(setMessageArray(data.messages)); // Ensure data.messages is an array
            socket.emit("joinChat", chat._id);
          } else {
            console.error("Failed to fetch messages", data);
          }
        },
        null,
        "json"
      );
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Error fetching messages");
    }
  };

  useEffect(() => {
    fetchAllMessages(); // Fetch messages initially

    // Add socket event listeners for real-time messaging
    socket.on("newMessage", (message) => {
      dispatch(setMessageArray([...messages, message])); // Update with new message
    });

    return () => {
      socket.off("newMessage"); // Clean up listener
    };
  }, [chat._id]); // Run only when chat._id changes

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      chatId: chat._id,
      content: newMessage,
    };

    await Util.call_Post_by_URI(
      "chats/message",
      messageData,
      (data, success) => {
        if (success) {
          dispatch(setMessageArray([...messages, data])); // Append new message
          setNewMessage(""); // Clear input after sending
          socket.emit("newMessage", data); // Emit new message
        } else {
          console.error("Failed to send message", data);
        }
      },
      "json"
    );
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socket || typing) return;

    setTyping(true);
    socket.emit("typing", chat._id);

    let lastTypingTime = new Date().getTime();
    setTimeout(() => {
      const timeNow = new Date().getTime();
      if (timeNow - lastTypingTime >= 3000 && typing) {
        socket.emit("stopTyping", chat._id);
        setTyping(false);
      }
    }, 3000);
  };

  return (
    <div className="flex flex-col flex-grow h-full p-4 pb-[5vh] bg-white border border-gray-300 rounded-lg">
      <div className="flex items-center pb-2 mb-4 border-b">
        <FaArrowLeft
          className="block mr-4 text-gray-500 cursor-pointer md:hidden"
          onClick={onBackClick}
        />
        <img
          src={chat.profileImage}
          alt="Profile"
          className="w-10 h-10 mr-4 rounded-full cursor-pointer"
          onClick={onContactProfileClick}
        />
        <h2 className="text-xl">{chat.name}</h2>
      </div>

      <MessageContainer messages={messages} currentUser={currentUser} chat={chat} /> {/* Render MessageContainer */}

      <div className="flex items-center mt-2 xl:mx-16">
        <input
          type="text"
          value={newMessage}
          onChange={typingHandler}
          placeholder="Type a message"
          className="flex-grow p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 ml-2 text-white bg-green-500 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;
