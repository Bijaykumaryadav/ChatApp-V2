import axios from "axios";
import constants from "../constants/constants";
import {jwtDecode} from 'jwt-decode';
import { toast } from "react-toastify";
import { login } from "../features/auth/authSlice";

// const token = useSelector((state) => state.auth.token);

const Util = {
  getTokens: async () => {
    const token = localStorage.getItem("token");
    // console.log(token);
    return token;
  },
  removeToken: () => {
    localStorage.removeItem("token");
  },
  isTokenExpired: (token) => {
    // console.log("Token received for expiration check:", token); // Debug log
    if (!token || token.split(".").length !== 3) {
      console.error("Invalid token format:", token);
      return true; // Invalid token means expired
    }
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decoded.exp < currentTime; // Check if the current time is greater than the expiration time
  },

  auth: async (dispatch) => {
    const url = `${constants.URL}users/auth`;
    const token = await Util.getTokens();
    // console.log(token);

    if (Util.isTokenExpired(token)) {
      // console.log(token);
      Util.removeToken();
      return false; // Token expired
    }

    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // console.log("userInfo",res);
      dispatch(login({ userInfo: res.data.user , token}));
      return true; // Successfully authenticated
    } catch (error) {
      console.log("Auth error:", error);
      Util.removeToken();
      return false; // Failed to authenticate
    }
  },

  call_get_with_uri_param: async (
    uri_with_param,
    callback,
    controller,
    type
  ) => {
    const url = constants.URL + uri_with_param;
    const token = "Bearer " + (await Util.getTokens());
    const resType = [
      "arraybuffer",
      "blob",
      "document",
      "json",
      "text",
      "stream",
    ].includes(type)
      ? type
      : undefined;

    try {
      const res = await callApi_get(url, token, controller, resType);
      if (callback) callback(res.data, true);
    } catch (error) {
      if (error.response) {
        console.log("get error =====> ", error.response);
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else if (
          error.response.status === 401 ||
          error.response.statusText === "Unauthorized"
        ) {
          console.log("Unauthorized");
          Util.removeToken();
        } else {
          callback(error.response.data, false);
        }
      }
    }
  },

  call_Post_by_URI: async (uri, collection, callback, type) => {
    const url = constants.URL + uri;
    const token = "Bearer " + (await Util.getTokens());
    const typeValue =
      type === "multipart" ? "multipart/form-data" : "application/json";

    try {
      const res = await callApi_post(url, collection, token, typeValue);
      if (callback) callback(res.data, true);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "Something went wrong! Please try again later.",
        { autoClose: 2000 }
      );
      if (error.response) {
        console.log("post error =====> ", error.response);
        if (error.response.statusText === "Unauthorized") {
          console.log("Unauthorized");
          Util.removeToken();
        } else if (error.response.status === 409) {
          console.log("Conflict: User exists but email not verified.");
          // Handle the 409-specific logic here (e.g., showing a message to the user)
          if (callback) callback(error.response.data, false);
        } else {
          if (callback) callback(error.response.data, false);
        }
      }
    }
  },

  call_Put_by_URI: async (uri, collection, callback, type) => {
    const url = constants.URL + uri;
    const token = "Bearer " + (await Util.getTokens());
    const typeValue =
      type === "multipart" ? "multipart/form-data" : "application/json";

    try {
      const res = await callApi_put(url, collection, token, typeValue);
      if (callback) callback(res.data, true);
    } catch (error) {
      if (error.response) {
        console.log("put error =====> ", error.response);
        if (error.response.statusText === "Unauthorized") {
          console.log("Unauthorized");
          Util.removeToken();
        } else {
          callback(error.response.data, false);
        }
      }
    }
  },

  call_Delete_by_URI: async (uri, callback, type, collection = {}) => {
    const url = constants.URL + uri;
    const token = "Bearer " + (await Util.getTokens());
    const typeValue =
      type === "multipart" ? "multipart/form-data" : "application/json";

    try {
      const res = await callApi_delete(url, token, typeValue, collection);
      if (callback) callback(res.data, true);
    } catch (error) {
      if (error.response) {
        console.log("delete error =====> ", error.response);
        if (error.response.statusText === "Unauthorized") {
          console.log("Unauthorized");
          Util.removeToken();
        } else {
          callback(error.response.data, false);
        }
      }
    }
  },
};



export const callApi_get = async (url, token) => {
  return await axios.get(url, {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });
};

const callApi_post = async (url, pram, token, type) => {
  return await axios.post(url, pram, {
    headers: {
      Accept: "application/json",
      "Content-Type": type,
      Authorization: token,
    },
    crossDomain: true,
  });
};

const callApi_put = async (url, pram, token, type) => {
  return await axios.put(url, pram, {
    headers: {
      Accept: "application/json",
      "Content-Type": type,
      Authorization: token,
    },
    crossDomain: true,
  });
};

const callApi_delete = async (url, token, type, pram) => {
  return await axios.delete(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": type,
      Authorization: token,
    },
    data: pram,
    crossDomain: true,
  });
};

export default Util;