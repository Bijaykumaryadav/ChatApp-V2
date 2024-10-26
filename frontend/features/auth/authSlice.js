import { createSlice } from "@reduxjs/toolkit";
import constants from "../../constants/constants";

const initialState = {
  userInfo: null,
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { userInfo, token } = action.payload;
      state.userInfo = userInfo;
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem("token", token);
    },
    logout: (state, action) => {
      state.userInfo = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    updateUserInfo: (state, action) => {
      if(!state.userInfo) {
        const token = constants.getTokens();
        if (token)state.userInfo = constants.getUserInfo(token);
      }
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
  },
});

export const { login, logout,updateUserInfo } = authSlice.actions;
export default authSlice.reducer;
