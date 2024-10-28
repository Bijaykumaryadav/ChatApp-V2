// src/components/ChatContainer.js
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import useSocket from "../hooks/useSocket"; // Adjust the path if necessary
import { addMessage } from "../../features/chat/chatSlice";

const ChatContainer = ({ chat, onContactProfileClick, onBackClick }) => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const messages = useSelector((state) => state.chat.messages);
  const [newMessage, setNewMessage] = useState("");

  // Listen for incoming messages
  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      dispatch(addMessage(message)); // Dispatch action to add the message to Redux state
    });

    return () => {
      socket.off("message");
    };
  }, [socket, dispatch]);

  // Function to send a new message
  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.emit("message", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col flex-grow h-full p-4 pb-[5vh] bg-white border border-gray-300 rounded-lg">
      {/* Header with back arrow for small screens */}
      <div className="flex items-center pb-2 mb-4 border-b">
        <FaArrowLeft
          className="block mr-4 text-gray-500 cursor-pointer md:hidden"
          onClick={() => {
            console.log("Back arrow clicked"); // Debugging log
            onBackClick();
          }}
        />
        <img
          src={chat.profileImage}
          alt="Profile"
          className="mr-4 rounded-full cursor-pointer w-10 h-10"
          onClick={onContactProfileClick}
        />
        <h2 className="text-xl">{chat.name}</h2>
      </div>

      {/* Chat area */}
      <div className="flex-grow p-2 overflow-y-scroll">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="my-1">
              {msg.content} {/* Assuming msg is an object with content */}
            </div>
          ))
        )}
      </div>

      {/* Input box */}
      <div className="flex items-center mt-2 xl:mx-16">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-grow p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 ml-2 text-white bg-green-500 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;
