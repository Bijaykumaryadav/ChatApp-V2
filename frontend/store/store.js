// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../features/chat/chatSlice';
// import authReducer from '../features/auth/authSlice';
// import profileReducer from '../features/profile/profileSlice';

// Combine all feature-specific reducers in one store
const store = configureStore({
  reducer: {
    chat: chatReducer,
    // auth: authReducer,
    // profile: profileReducer,
  },
});

export default store;
