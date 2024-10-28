// src/slices/chatSlice.js
import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    activeChat: null,
    messages: [],
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
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      // Append the new message to the messages array
      state.messages.push(action.payload);
    },
  },
});

export const { setActiveChat, setMessages, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
