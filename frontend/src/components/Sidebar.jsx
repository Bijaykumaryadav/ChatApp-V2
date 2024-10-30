import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Util from "../../helpers/Util";
import { setSearchedUsers } from "../../features/chat/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import UserView from "./UserView";

const Sidebar = ({ onChatSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const contacts = useSelector((state) => state.chat.searchedUsers);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchContacts = async () => {
      if (!searchQuery) {
        dispatch(setSearchedUsers([]));
        return;
      }

      setLoading(true);
      try {
        await Util.call_get_with_uri_param(
          `users/search-user?search=${searchQuery}`,
          (res, status) => {
            if (status && res?.users) {
              dispatch(setSearchedUsers(res.users));
            } else {
              dispatch(setSearchedUsers([]));
            }
          }
        );
      } catch (error) {
        dispatch(setSearchedUsers([]));
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [searchQuery, dispatch]);

  const setSelectedChat = (user) => {
    if (onChatSelect) onChatSelect(user);
  };

  return (
    <div className="flex flex-col w-full h-full p-4 bg-gray-100">
      {/* Search Bar */}
      <div className="flex items-center mb-4">
        <FaSearch className="mr-2 text-gray-500" />
        <input
          type="text"
          placeholder="Search contacts"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow p-2 bg-gray-100 border-none rounded-md focus:outline-none"
        />
      </div>

      {/* Contact List */}
      <ul className="flex-grow overflow-y-auto">
        {loading ? (
          <li className="text-gray-500">Loading...</li>
        ) : contacts.length > 0 ? (
          contacts.map((contact) => (
            <UserView
              key={contact._id}
              userId={contact._id}
              handleFunction={() => setSelectedChat(contact)}
            />
          ))
        ) : (
          <li className="text-gray-500">No contacts found</li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
