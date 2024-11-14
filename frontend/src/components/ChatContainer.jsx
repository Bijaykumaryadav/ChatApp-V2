import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeChatSelector, setMessageArray } from "../../features/chat/chatSlice";
import Util from "../../helpers/Util";
import { toast } from "react-toastify";
import useSocket from "../hooks/useSocket";
import { FaArrowLeft } from "react-icons/fa";
import MessageContainer from "./MessageContainer";

const ChatContainer = ({ chat, onContactProfileClick, onBackClick }) => {
  const dispatch = useDispatch();
  const socket = useSocket(); // Using the singleton socket instance
  const messages = useSelector((state) => state.chat.messageArray);
  const currentUser = useSelector((state) => state.auth.userInfo);
  const receiverUser = useSelector(activeChatSelector);

  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  console.log("Chat is is:",chat._id);

  const fetchAllMessages = async () => {
    try {
      const messageUri = `chats/message/${chat._id}`;
      await Util.call_get_with_uri_param(
        messageUri,
        (data, success) => {
          if (success) {
            console.log("fetched data is",data);
            dispatch(setMessageArray(data));
            socket.emit("joinChat", chat._id);
          } else {
            console.error("Failed to fetch messages", data);
          } 
        },
        null,
        "json"
      );
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Error fetching messages");
    }
  };

  useEffect(() => {
    socket.emit("setup", currentUser);
    socket.on("connected", () => setTyping(false));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stopTyping", () => setIsTyping(false));

    fetchAllMessages();

    return () => {
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [chat._id]);

useEffect(() => {
  socket.on("messageRecieved", (newMessageRec) => {
    // Check if the message is for the current chat
          console.log("vv", newMessageRec.sender._id);
          console.log("cc",chat._id);
          console.log("ii",currentUser._id);

    if (newMessageRec.sender._id !== currentUser._id) {
      console.log("vv", newMessageRec.sender._id);
      // Update the message array for the current chat
      dispatch(setMessageArray([...messages, newMessageRec]));
    }
  });

  return () => {
    socket.off("messageRecieved");
  };
}, []);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      chatId: chat._id,
      content: newMessage,
    };

    await Util.call_Post_by_URI(
      "chats/message",
      messageData,
      (data, success) => {
        if (success) {
          dispatch(setMessageArray([...messages, data]));
          console.log("messages is ",...messages);
          console.log("post data",data);
          setNewMessage("");
          socket.emit("newMessage", data);
        } else {
          console.error("Failed to send message", data);
        }
      },
      "json"
    );
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socket || typing) return;

    setTyping(true);
    socket.emit("typing", chat._id);

    const lastTypingTime = new Date().getTime();
    setTimeout(() => {
      const timeNow = new Date().getTime();
      if (timeNow - lastTypingTime >= 3000 && typing) {
        socket.emit("stopTyping", chat._id);
        setTyping(false);
      }
    }, 3000);
  };

  return (
    <div className="flex flex-col flex-grow p-4 pb-[5vh] bg-white border border-gray-300 rounded-lg overflow-visible h-[90vh]">
      <div className="flex items-center pb-2 mb-4 border-b">
        <FaArrowLeft
          className="block mr-4 text-gray-500 cursor-pointer md:hidden"
          onClick={onBackClick}
        />
        <img
          src={chat.profileImage}
          alt="Profile"
          className="w-10 h-10 mr-4 rounded-full cursor-pointer"
          onClick={onContactProfileClick}
        />
        <h2 className="text-xl">{chat.name}</h2>
        {isTyping && <p className="ml-4 text-sm text-gray-500">Typing...</p>}
      </div>
      <MessageContainer
        messages={messages}
        receiverUser={receiverUser}
        currentUser={currentUser}
        chat={chat}
      />
      <div className="flex items-center mt-2 xl:mx-16">
        <input
          type="text"
          value={newMessage}
          onChange={typingHandler}
          placeholder="Type a message"
          className="flex-grow p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 ml-2 text-white bg-green-500 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;
