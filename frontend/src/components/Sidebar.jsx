// Sidebar.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Util from "../../helpers/Util";
import { chatsSelector, setChats } from "../../features/chat/chatSlice";
import SearchBar from "./SearchBar";
import UserView from "./UserView";

const Sidebar = ({ onChatSelect }) => {
  const initialUser = useSelector((state) => state.auth.userInfo);
  const chats = useSelector(chatsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        await Util.call_get_with_uri_param("chats", (data, status) => {
          if (status) {
            dispatch(setChats(data));
          } else {
            toast.error("Error fetching chats");
          }
        });
      } catch (error) {
        console.error("Error in fetching chats:", error);
        toast.error("Internal Server Error!");
      }
    };

    if (initialUser) fetchChats();
  }, [initialUser, dispatch]);

  const getName = (chat) => {
    if (chat.isGroupChat) {
      return {
        name: chat.chatName,
        profileImage:
          chat.profileImage || "https://cdn-icons-png.flaticon.com/512/2352/2352167.png",
      };
    } else {
      const otherUser = chat.users.find((user) => user._id !== initialUser._id);
      return {
        _id: otherUser?._id,
        name: otherUser?.name || "Unknown User",
        profileImage: otherUser?.profileImage || "https://via.placeholder.com/150",
      };
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-4 bg-gray-100">
      {/* Search Bar */}
      <SearchBar onSelectUser={onChatSelect} />

      {/* Contact List */}
      <ul className="flex-grow overflow-y-auto">
        {chats.length > 0 ? (
          chats.map((chat) => {
            const user = getName(chat);
            // console.log("User is:",user)
            // console.log("chatId",chat._id);
            return (
              <UserView
                key={chat._id}
                userId = {user._id}
                searchedUser={user}
                handleFunction={() => onChatSelect(chat)}
              />
            );
          })
        ) : (
          <li className="text-gray-500">No contacts found</li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
