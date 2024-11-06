// SearchBar.js
import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Util from "../../helpers/Util";
import { setSearchedUsers } from "../../features/chat/chatSlice";
import UserView from "./UserView";

const SearchBar = ({ onSelectUser }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const searchedUsers = useSelector((state) => state.chat.searchedUsers);

  // Auto-search on input change with a delay
  useEffect(() => {
    const fetchUsers = async () => {
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
        console.error("Error in searching:", error);
        toast.error("Internal server error!");
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchUsers();
    }, 500); // 500ms delay for debounce

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, dispatch]);

  return (
    <div className="relative w-full p-2 bg-slate-200">
      <div className="flex items-center gap-2">
        <FiSearch className="text-xl text-gray-500" />
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow p-2 border-b border-gray-400 bg-inherit focus:outline-none placeholder:text-gray-600"
        />
      </div>
      {loading && <p className="text-gray-500">Loading...</p>}
      {!loading && searchedUsers.length > 0 && (
        <div className="mt-2 rounded-md bg-slate-100">
          {searchedUsers.map((user) => (
            <UserView key={user._id} searchedUser={user} handleFunction={() => onSelectUser(user)} />
          ))}
        </div>
      )}
      {!loading && searchedUsers.length === 0 && searchQuery && (
        <p className="mt-2 text-gray-500">No users found...</p>
      )}
    </div>
  );
};

export default SearchBar;
