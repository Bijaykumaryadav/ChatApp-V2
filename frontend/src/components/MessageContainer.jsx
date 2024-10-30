import React from "react";
import { useSelector } from "react-redux";

const MessageContainer = ({ currentUser, chat }) => {
  const messages = useSelector((state) => state.chat.messageArray);

  return (
    <div className="flex-grow p-2 overflow-y-scroll">
      {messages.length === 0 ? (
        <p className="text-center text-gray-500">No messages yet.</p>
      ) : (
        messages.map((msg, index) => {
          // Ensure msg.sender exists
          const sender = msg.sender || {};
          return (
            <div
              key={index}
              className={`flex items-end my-2 ${sender._id === currentUser._id ? "justify-end" : "justify-start"}`}
            >
              {sender._id !== currentUser._id && (
                <img
                  src={chat.profileImage}
                  alt="Receiver profile"
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              <div
                className={`max-w-xs p-2 rounded-lg ${
                  sender._id === currentUser._id
                    ? "bg-green-500 text-white self-end"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                <strong>{sender.name}</strong>
                <p>{msg.content}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MessageContainer;
