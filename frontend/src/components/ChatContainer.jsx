import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const ChatContainer = ({ chat, onContactProfileClick, onBackClick }) => {
  return (
    <div className="flex flex-col flex-grow h-full p-4 pb-[5vh] bg-white border border-gray-300 rounded-lg ">
      {/* Header with back arrow for small screens */}
      <div className="flex items-center pb-2 mb-4 border-b">
        {/* Back arrow for small screens */}
        <FaArrowLeft
          className="block mr-4 text-gray-500 cursor-pointer md:hidden"
          onClick={onBackClick}
        />

        {/* Contact's profile picture */}
        <img
          src={`https://via.placeholder.com/40`}
          alt="Profile"
          className="mr-4 rounded-full cursor-pointer"
          onClick={onContactProfileClick}
        />
        <h2 className="text-xl">{chat}</h2>
      </div>

      {/* Chat area */}
      <div className="flex-grow p-2 overflow-y-scroll">
        <p className="text-center text-gray-500">Messages with {chat}</p>
      </div>

      {/* Input box */}
      <div className="flex items-center mt-2 xl:mx-16">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-grow p-2 border border-gray-300 rounded-lg"
        />
        <button className="px-4 py-2 ml-2 text-white bg-green-500 rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;
