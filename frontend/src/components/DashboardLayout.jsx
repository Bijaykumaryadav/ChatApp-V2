// src/components/DashboardLayout.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatContainer from './ChatContainer';
import ProfileContainer from './ProfileContainer';
import { FaWhatsapp } from 'react-icons/fa';

const DashboardLayout = () => {
  const [activeChat, setActiveChat] = useState(null); // Track selected chat
  const [isProfileOpen, setProfileOpen] = useState(false); // Track profile visibility
  const [isMobileView, setMobileView] = useState(false); // For small screen chat

  // Function to open chat
  const openChat = (chat) => {
    setActiveChat(chat);
    setMobileView(true); // In mobile, switch to chat view
  };

  // Handle back to contact list on mobile view
  const goBackToContacts = () => {
    setMobileView(false);
    setActiveChat(null);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar for large screens, or for small screens if not in chat */}
      <Sidebar
        className={`md:flex ${isMobileView ? 'hidden' : 'flex'} w-full md:w-1/4`}
        onChatSelect={openChat}
        onProfileClick={() => setProfileOpen(true)}
      />

      {/* Show profile on profile picture click */}
      {isProfileOpen ? (
        <ProfileContainer className="flex-grow" onClose={() => setProfileOpen(false)} />
      ) : (
        // Chat container or placeholder (WhatsApp logo) for large screens
        <div className="flex items-center justify-center flex-grow">
          {activeChat ? (
            <ChatContainer
              chat={activeChat}
              onBack={goBackToContacts}
              isMobileView={isMobileView}
            />
          ) : (
            <FaWhatsapp size={64} className="text-green-500 xs:hidden md:block" />
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
