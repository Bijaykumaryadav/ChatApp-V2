import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setChats } from "../../features/chat/chatSlice";
import Util from "../../helpers/Util";

const UserView = ({ userId, handleFunction }) => {
  const dispatch = useDispatch();
  const searchedUser = useSelector((state) =>
    state.chat.searchedUsers.find((user) => user._id === userId)
  );

  const createChat = async (userId) => {
    try {
      await Util.call_Post_by_URI("/chats", { userId }, (data, status) => {
        if (status) {
          dispatch(setChats(data));
        } else {
          toast.error("Error creating chat");
        }
      });
    } catch (error) {
      toast.error("Internal Server Error!");
      console.log("Error in rendering chats", error);
    }
  };

  if (!searchedUser) return null;

  return (
    <div
      className="container flex gap-2 m-1 items-center border-b border-gray-400 hover:bg-gray-400 cursor-pointer"
      onClick={() => createChat(searchedUser._id)}
    >
      <div className="imageContainer p-2" onClick={handleFunction}>
        <img
          src={searchedUser?.profileImage}
          alt={searchedUser?.name}
          className="w-10 h-10 mr-2 rounded-full cursor-pointer"
        />
      </div>
      <div className="textContainer flex flex-col m-4">
        <p className="userName text-[18px]">{searchedUser?.name}</p>
        <p>Message</p>
      </div>
    </div>
  );
};

export default UserView;
