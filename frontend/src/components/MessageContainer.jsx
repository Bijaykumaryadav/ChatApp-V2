import React, { useRef } from "react";
import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";

const MessageContainer = ({ messages, currentUser }) => {
  const scrollContainerRef = useRef(null);
  const chat = useSelector((state) => state.chat.chats);

  const handleScroll = () => {
    if (scrollContainerRef.current.scrollTop === 0) {
      // Handle logic for scrolling to the top (e.g., loading more messages)
    }
  };

  // Function to determine if the message sender is the current user
  const isCurrentUser = (message) => message?.sender?._id === currentUser?._id;

  // Get the receiver's details from `chat[0].users`
  const getReceiverDetails = () => {
    if (chat?.[0]?.users && chat[0].users.length === 2) {
      // Filter the user whose ID is not the current user's ID
      return chat[0].users.find((user) => user._id !== currentUser?._id);
    }
    return null; // Return null if no receiver is found
  };

  const receiver = getReceiverDetails();

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
              {/* Show receiver's profile image for incoming messages */}
              {!isCurrentUser(message) && receiver && (
                <img
                  src={receiver?.profileImage}
                  alt={receiver?.name || "Receiver"}
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
