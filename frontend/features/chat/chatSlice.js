import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    activeChat: null,
    searchedUsers: [],
    messageArray: [], // Initialize messageArray as an empty array
    chats: [], // Initialize chats as an empty array if not already defined
  },
  reducers: {
    setActiveChat: (state, action) => {
      if (action.payload) {
        const { _id, name, profileImage, email } = action.payload;
        state.activeChat = { _id, name, profileImage, email };
      } else {
        state.activeChat = null;
      }
    },
    setSearchedUsers: (state, action) => {
      state.searchedUsers = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setMessageArray: (state, action) => {
      const payload = action.payload;
      if (Array.isArray(payload)) {
        state.messageArray = [...payload];
      } else {
        state.messageArray = [...state.messageArray, payload];
      }
    },
    setChats: (state, action) => {
      const payload = action.payload;
      if (Array.isArray(payload)) {
        const newChats = payload.filter(
          (chat) =>
            !state.chats.some((existingChat) => existingChat.id === chat.id)
        );
        state.chats = [...newChats, ...state.chats];
      } else if (typeof payload === "object") {
        const existingChatIndex = state.chats.findIndex(
          (existingChat) => existingChat._id === payload._id
        );
        if (existingChatIndex !== -1) {
          state.chats[existingChatIndex] = payload;
        } else {
          state.chats = [payload, ...state.chats];
        }
      }
    },
  },
});

export const {
  setActiveChat,
  setMessages,
  addMessage,
  setChats,
  setMessageArray,
  setSearchedUsers,
} = chatSlice.actions;
export default chatSlice.reducer;
