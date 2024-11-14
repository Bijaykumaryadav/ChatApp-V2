import Util from "../helpers/Util";

const getApiUrl = () => {
  return process.env.REACT_APP_API_URL || "http://localhost:8000/apis/v1/"; // Fallback for development
};

const constants = {
  URL: getApiUrl(),
  getTokens: () => {
    return localStorage.getItem("token");
  },
  getUserInfo: (token = localStorage.getItem("token")) => {
    if (token) {
      Util.call_get_with_uri_param("users/auth", (res, status) => {
        if (status) {
          return res.user;
        }
      });
    }
  },
  removeToken: () => {
    localStorage.removeItem("token");
    window.location.pathname = "/";
  },
};
export default constants;
