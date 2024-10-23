// src/components/ProfileOverlay.jsx
import React from 'react';

const ProfileOverlay = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 p-6 bg-white rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="mb-4 text-green-500"
        >
          Close
        </button>
        <div className="flex items-center">
          <img
            src={`https://via.placeholder.com/80`}
            alt="Profile"
            className="mr-4 rounded-full"
          />
          <div>
            <h2 className="text-xl font-bold">John Doe</h2>
            <p>Email: johndoe@example.com</p>
            <p>Status: Available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverlay;
