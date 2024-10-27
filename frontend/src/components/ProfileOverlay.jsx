import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { AiOutlineCloseSquare } from "react-icons/ai";

const ProfileOverlay = ({ onClose }) => {
  const dispatch = useDispatch();
  const { profileImage, name, email, status } = useSelector(
    (state) => state.auth.userInfo || {}
  );

  const handleLogout = () => {
    dispatch(logout());
    onClose(); 
    window.location.pathname = "/"; 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 sm:p-8">
      <div className="relative w-full max-w-xs p-6 bg-white rounded-lg shadow-lg sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        <button
          onClick={onClose}
          className="absolute text-black top-4 right-6 hover:text-gray-700 focus:outline-none"
        >
          <AiOutlineCloseSquare size={34} /> {/* Adjusted size for a professional look */}
        </button>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start md:items-center">
          <img
            src={profileImage || "https://via.placeholder.com/80"} // Placeholder in case image is not available
            alt="Profile"
            className="object-cover w-20 h-20 rounded-full sm:w-24 sm:h-24 lg:w-28 lg:h-28"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
              {name || "John Doe"}
            </h2>
            <p className="text-gray-600">Email: {email || "johndoe@example.com"}</p>
            <p className="text-gray-600">Status: {status || "Available"}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileOverlay;
