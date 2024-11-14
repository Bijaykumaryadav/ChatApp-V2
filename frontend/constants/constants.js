import Util from "../helpers/Util";

const getApiUrl = () => {
  return "https://chatapp-v2-vq9f.onrender.com/apis/v1/";
};

// const getApiUrl = () => {
//   return "http://localhost:8000/apis/v1/";
// };

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
