// src/components/DashboardLayout.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatContainer from './ChatContainer';
import Navbar from './Navbar';
import ProfileOverlay from './ProfileOverlay';

const DashboardLayout = () => {
  const [activeChat, setActiveChat] = useState(null); // Track selected chat
  const [isProfileOverlayOpen, setProfileOverlayOpen] = useState(false); // Overlay for logged-in user's profile
  const [activeChatProfileOverlay, setActiveChatProfileOverlay] = useState(false); // Overlay for contact profile

  const openChat = (chat) => {
    setActiveChat(chat);
  };

  const handleProfileClick = () => {
    setProfileOverlayOpen(true);
  };

  const handleContactProfileClick = () => {
    setActiveChatProfileOverlay(true);
  };

  const closeChat = () => {
    setActiveChat(null); // Close chat and show sidebar again on small screens
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar onProfileClick={handleProfileClick} />

      {/* Main layout */}
      <div className="flex flex-grow">
        {/* Sidebar - Full width on small screens, fixed width on md+ screens */}
        <div className={`md:max-w-[350px] w-full md:w-1/3 bg-gray-100 ${activeChat ? 'hidden sm:block' : 'block'}`}>
          <Sidebar onChatSelect={openChat} />
        </div>

        {/* Chat Container visible only when a chat is selected on small screens */}
        {activeChat && (
          <div className="flex-grow w-full md:w-2/3">
            <ChatContainer
              chat={activeChat}
              onContactProfileClick={handleContactProfileClick}
              onBackClick={closeChat}
            />
          </div>
        )}
      </div>

      {/* Profile Overlay for logged-in user */}
      {isProfileOverlayOpen && (
        <ProfileOverlay onClose={() => setProfileOverlayOpen(false)} />
      )}

      {/* Profile Overlay for active contact */}
      {activeChatProfileOverlay && (
        <ProfileOverlay onClose={() => setActiveChatProfileOverlay(false)} />
      )}
    </div>
  );
};

export default DashboardLayout;
