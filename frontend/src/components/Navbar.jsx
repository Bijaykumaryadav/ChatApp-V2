import React, { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import Util from "../../helpers/Util";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authSlice";

const Navbar = ({ onProfileClick }) => {
  const dispatch = useDispatch();

  // Accessing profileImage from the Redux store
  const profileImage = useSelector(
    (state) => state.auth.userInfo?.profileImage
  );

  useEffect(() => {
    Util.call_get_with_uri_param("users/auth", (res, status) => {
      // console.log("API Response:", res);
      if (status && res?.user) {
        // console.log("Profile Image URL:", res.user.profileImage);
      dispatch(login({ userInfo: res.user , token:res.token  }));
      }
    });
  }, [dispatch]);

  return (
    <div className="flex items-center justify-end w-full p-4 bg-gray-200">
      {/* Right: Profile Picture */}
      {profileImage ? (
        <img
          src={profileImage}
          alt="Profile"
          className="w-8 h-8 rounded-full cursor-pointer"
          onClick={onProfileClick}
        />
      ) : (
        <FaUserCircle
          size={32}
          className="text-gray-500 cursor-pointer"
          onClick={onProfileClick}
        />
      )}
    </div>
  );
};

export default Navbar;
