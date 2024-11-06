import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChat } from "../../features/chat/chatSlice";
import Sidebar from "./Sidebar";
import ChatContainer from "./ChatContainer";
import Navbar from "./Navbar";
import ProfileOverlay from "./ProfileOverlay";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const activeChat = useSelector((state) => state.chat.activeChat);
  const [isProfileOverlayOpen, setProfileOverlayOpen] = useState(false);
  const [activeChatProfileOverlay, setActiveChatProfileOverlay] =
    useState(false);

  const openChat = (chat) => {
    const { _id, name, profileImage, email } = chat; // Only required fields 
    dispatch(setActiveChat({ _id, name, profileImage, email }));
  };

  const handleProfileClick = () => {
    setProfileOverlayOpen(true);
  };

  const handleContactProfileClick = () => {
    setActiveChatProfileOverlay(true);
  };

  const closeChat = () => {
    dispatch(setActiveChat(null));
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar onProfileClick={handleProfileClick} />

      <div className="flex flex-grow">
        <div
          className={`md:max-w-[350px] w-full md:w-1/3 bg-gray-100 ${
            activeChat ? "hidden sm:block" : "block"
          }`}
        >
          <Sidebar onChatSelect={openChat} />
        </div>

        {activeChat && (
          <div className="flex-grow w-full md:w-2/3">
            <ChatContainer
              chat={activeChat} // Pass only the name to display
              onContactProfileClick={handleContactProfileClick}
              onBackClick={closeChat} // Pass closeChat to handle back click
            />
          </div>
        )}
      </div>

      {isProfileOverlayOpen && (
        <ProfileOverlay onClose={() => setProfileOverlayOpen(false)} />
      )}

      {activeChatProfileOverlay && (
        <ProfileOverlay onClose={() => setActiveChatProfileOverlay(false)} />
      )}
    </div>
  );
};

export default DashboardLayout;
