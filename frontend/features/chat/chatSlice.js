// src/features/chat/chatSlice.js
import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    activeChat: null,
    messages: [],
  },
  reducers: {
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { setActiveChat, setMessages } = chatSlice.actions;
export default chatSlice.reducer;
