// src/components/Navbar.jsx
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = ({ onProfileClick }) => {
  return (
    <div className="flex items-center justify-end w-full p-4 bg-gray-200">
      {/* Right: Profile Picture */}
      <FaUserCircle
        size={32}
        className="text-gray-500 cursor-pointer"
        onClick={onProfileClick}
      />
    </div>
  );
};

export default Navbar;
