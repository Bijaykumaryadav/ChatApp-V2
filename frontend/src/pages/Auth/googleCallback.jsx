import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

function GoogleCallback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userData = Object.fromEntries(searchParams.entries());
    //You can store it in local storage,state,or use it as needed
    localStorage.setItem("user", JSON.stringify(userData));
    // toast.success("Signed in Successful");
    navigate("/users/dashboard");
  }, [location.search]);

  return <div>redirecting....</div>;
}

export default GoogleCallback;