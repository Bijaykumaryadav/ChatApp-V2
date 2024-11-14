import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";
import { setMessageArray } from "../../features/chat/chatSlice";
import useSocket from "../hooks/useSocket";

const MessageContainer = ({ messages, currentUser, chat }) => {
  const dispatch = useDispatch();
  const scrollContainerRef = useRef(null);
  const socket = useSocket();
  // console.log("Receiver user",receiverUser);


  const handleScroll = () => {
    if (scrollContainerRef.current.scrollTop === 0) {
    }
  };

  // Check if the message sender is the current user
  const isCurrentUser = (message) => message?.sender?._id === currentUser?._id;

  return (
    <div ref={scrollContainerRef} onScroll={handleScroll} className="h-[68vh]">
      <ScrollableFeed className="pb-5 scrollbar-thin">
        {messages && messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start mb-2 ${isCurrentUser(message) ? "justify-end" : "justify-start"}`}
            >
              {!isCurrentUser(message) && (
                <img
                  src={chat?.profileImage}
                  alt="Receiver profile"
                  className="w-8 h-8 mr-2 rounded-full"
                />
              )}
              <div
                className={`max-w-xs p-2 rounded-lg ${
                  isCurrentUser(message)
                    ? "bg-green-500 text-white self-end"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                <p>{message?.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No messages yet.</p>
        )}
      </ScrollableFeed>
    </div>
  );
};

export default MessageContainer;