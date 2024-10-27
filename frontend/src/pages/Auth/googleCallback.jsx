import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../../features/auth/authSlice";

function GoogleCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token"); // Retrieve the token from the URL
    console.log(token);
    //You can store it in local storage,state,or use it as needed
    dispatch(login({ userInfo: "", token }));
    toast.success("Signed in Successful");
    navigate("/users/dashboard");
  }, [location.search]);

  return <div>redirecting....</div>;
}

export default GoogleCallback;