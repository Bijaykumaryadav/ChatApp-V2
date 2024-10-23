import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Sidebar = ({ onChatSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const contacts = ['Alice', 'Bob', 'Charlie']; // Dummy contacts

  // Filter contacts based on search query
  const filteredContacts = contacts.filter((contact) =>
    contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      {/* Contact list - Make this part scrollable */}
      <ul className="flex-grow overflow-y-auto">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact, index) => (
            <li
              key={index}
              className="p-2 border-b border-gray-300 cursor-pointer hover:bg-gray-200"
              onClick={() => onChatSelect(contact)}
            >
              {contact}
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
