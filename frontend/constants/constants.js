import Util from "../helpers/Util";

const getApiUrl = () => {
    return "http://localhost:8000/v1/apis/";
    // return import.meta.env.REACT_APP_BACKEND_URL;
};
const constants = {
    URL: getApiUrl(),
    getTokens: () => {
        return localStorage.getItem("token");
    },
    getUserInfo: (token = localStorage.getItem("token")) => {
        if (token) {
            Util.call_get_with_uri_param("user/auth", (res, status) => {
                if (status) {
                    return res.user;
                }
            })
        }
    },
    removeToken: () => {
        localStorage.removeItem("token");
        window.location.pathname = "/auth";
    }
}
export default constants