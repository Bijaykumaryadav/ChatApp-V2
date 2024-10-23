// src/components/ChatContainer.jsx
import React from 'react';

const ChatContainer = ({ chat, onBack, isMobileView }) => {
  return (
    <div className="flex flex-col w-full h-full p-4 bg-white md:w-3/4">
      {/* Header with back button for mobile */}
      {isMobileView && (
        <div className="flex items-center mb-4">
          <button onClick={onBack} className="mr-4 text-green-500">Back</button>
          <h2 className="text-xl">{chat}</h2>
        </div>
      )}

      {/* Chat area */}
      <div className="flex-grow p-2 overflow-y-scroll border border-gray-200 rounded-lg">
        <p className="text-center text-gray-500">Messages with {chat}</p>
      </div>

      {/* Input box */}
      <div className="flex items-center mt-2">
        <input type="text" placeholder="Type a message" className="flex-grow p-2 border rounded-lg" />
        <button className="px-4 py-2 ml-2 text-white bg-green-500 rounded-lg">Send</button>
      </div>
    </div>
  );
};

export default ChatContainer;
