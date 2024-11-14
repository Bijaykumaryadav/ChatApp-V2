import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setChats, setActiveChat, chatsSelector } from "../../features/chat/chatSlice";
import Util from "../../helpers/Util";
import useSocket from "../hooks/useSocket";

const UserView = ({ userId, searchedUser, handleFunction }) => {
  const dispatch = useDispatch();
  const initialUser = useSelector((state) => state.auth.userInfo);
  const socket = useSocket();
  const chats = useSelector(chatsSelector);

  useEffect(() => {
    // Listen for the "newChat" event from the socket
    socket.on("newChat", (newChat) => {
      // Update the chats in the Redux store
      dispatch(setChats([...chats, newChat]));

      // Set the new chat as the active chat
      dispatch(setActiveChat(newChat));
    });

    return () => {
      // Clean up the event listener when the component unmounts
      socket.off("newChat");
    };
  }, [dispatch, socket]);

  const createChat = async (userId) => {
    try {
      await Util.call_Post_by_URI("chats", { userId }, (data, status) => {
        if (status) {
          // Update the chats in the Redux store
          dispatch(setChats([...chats, data]));

          // Set the new chat as the active chat
          dispatch(setActiveChat(data));
        } else {
          toast.error("Error creating chat");
        }
      });
    } catch (error) {
      toast.error("Internal Server Error!");
      console.log("Error in creating chat:", error);
    }
  };

  if (!searchedUser) return null;

  return (
    <div
      className="container flex items-center gap-2 m-1 border-b border-gray-400 cursor-pointer hover:bg-gray-400"
      onClick={() => createChat(searchedUser._id)}
    >
      <div className="p-2 imageContainer" onClick={handleFunction}>
        <img
          src={searchedUser?.profileImage}
          alt={searchedUser?.name}
          className="w-10 h-10 mr-2 rounded-full cursor-pointer"
        />
      </div>
      <div className="flex flex-col m-4 textContainer">
        <p className="userName text-[18px]">{searchedUser?.name}</p>
        <p>Message</p>
      </div>
    </div>
  );
};

export default UserView;