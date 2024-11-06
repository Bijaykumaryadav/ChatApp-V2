import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";

const MessageContainer = ({ messages, currentUser, receiverUser, chat }) => {
  console.log(messages);
  // console.log("chat is : ", chat)

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom on load
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleScroll = () => {
    if (scrollContainerRef.current.scrollTop === 0) {
      // Load older messages if needed
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
              className={`flex items-start mb-2 ${
                isCurrentUser(message) ? "justify-end" : "justify-start"
              }`}
            >
              {!isCurrentUser(message) && (
                <img
                  src={receiverUser?.profileImage || chat?.profileImage}
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
