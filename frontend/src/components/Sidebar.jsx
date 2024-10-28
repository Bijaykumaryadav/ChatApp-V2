import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Util from "../../helpers/Util";

const Sidebar = ({ onChatSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      if (!searchQuery) {
        setContacts([]); // Clear contacts if no search query
        return;
      }

      setLoading(true); // Set loading state to true

      try {
        // Call API with the search query as a parameter
        await Util.call_get_with_uri_param(
          `users/search-user?search=${searchQuery}`,
          (res, status) => {
            if (status && res?.users) {
              console.log("Users fetched successfully:", res.users);
              setContacts(res.users);
            } else {
              console.error("No users found");
              setContacts([]); // Clear contacts if no users found
            }
          }
        );
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setContacts([]); // Clear contacts on error
      } finally {
        setLoading(false); // Set loading state back to false
      }
    };

    fetchContacts();
  }, [searchQuery]);

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

      {/* Contact List - Scrollable and Dynamic */}
      <ul className="flex-grow overflow-y-auto">
        {loading ? (
          <li className="text-gray-500">Loading...</li>
        ) : contacts.length > 0 ? (
          contacts.map((contact) => (
            <li
              key={contact._id}
              className="p-2 border-b border-gray-300 cursor-pointer hover:bg-gray-200"
              onClick={() => onChatSelect(contact)}
            >
              {contact.name}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No contacts found</li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
