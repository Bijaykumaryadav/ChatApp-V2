// src/components/Sidebar.jsx
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Sidebar = ({ className, onChatSelect, onProfileClick }) => {
  const contacts = ['Alice', 'Bob', 'Charlie']; // Dummy contacts

  return (
    <div className={`${className} flex flex-col bg-gray-100 p-4`}>
      {/* Profile Icon */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Contacts</h2>
        <FaUserCircle size={32} className="text-gray-500 cursor-pointer" onClick={onProfileClick} />
      </div>

      {/* Contact list */}
      <ul>
        {contacts.map((contact, index) => (
          <li
            key={index}
            className="p-2 border-b border-gray-300 cursor-pointer hover:bg-gray-200"
            onClick={() => onChatSelect(contact)}
          >
            {contact}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
