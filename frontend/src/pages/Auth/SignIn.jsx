import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../../features/auth/authSlice";
import VerifyPage from "./VerifyPage"; 
import Util from "../../../helpers/Util";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false); // Overlay state
  const navigate = useNavigate();
  const dispatch = useDispatch();

const handleSignIn = async (e) => {
  e.preventDefault();
  try {
    // setIsLoading(true); // Start loading
    Util.call_Post_by_URI(
      "users/signin",
      {
        email,
        password,
      },
      (res, status) => {
        // setIsLoading(false); // Stop loading after response

        if (status && res?.success) {
          // Successful login
          console.log("34",res);
          toast.success(res?.message || "Sign-in successful!", {
            autoClose: 2000,
          });
          dispatch(login({ userInfo: "", token: res.token }));
          setTimeout(() => {
            navigate("/users/dashboard");
          }, 1000);
        } else if (
          res?.message === "Email not verified. Verification email has been resent."
        ) {
          setShowOverlay(true); // Show verification overlay
        } else {
          // Handle other errors
          toast.error(res?.message || "Sign-in failed. Please try again.", {
            autoClose: 2000,
          });
        }
      }
    );
  } catch (error) {
    // setIsLoading(false); // Stop loading on error
    console.error("Error during sign-in:", error);
    toast.error("Something went wrong. Please try again.", {
      autoClose: 2000,
    });
  }
};


  const handleGoogleSignIn = () => {
    window.location.href =
      "https://chatapp-v2-3.onrender.com/apis/v1/users/auth/google";
  };

  return (
    <>
      <form
        className="w-full px-6 pb-6 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl animate__animated animate__fadeIn"
        onSubmit={handleSignIn}
      >
        <label className="w-full mb-4" htmlFor="email">
          Email:
          <input
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Enter Email"
            id="email"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="w-full mb-4" htmlFor="password">
          <div className="flex items-center justify-between mt-2">
            <span className="w-auto">Password</span>
            <Link to="/users/forgotpassword" className="text-blue-500">
              Forgot Password
            </Link>
          </div>
          <div className="relative">
            <input
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              name="password"
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute inset-y-0 flex items-center cursor-pointer right-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          </div>
        </label>
        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign In
        </button>
        <button
          type="button"
          className="flex items-center justify-center w-full px-4 py-2 mt-4 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle className="w-5 h-5 mr-2" />
          Login with Google
        </button>
      </form>

      {/* Overlay for the verification code */}
      {showOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overlay-background">
          <div className="w-full p-6 bg-white rounded-lg min-h-[300px] min-w-[300px] xs:max-w-[300px] sm:max-w-[424px] md:max-w-[424px]">
            <VerifyPage email={email} setShowOverlay={setShowOverlay} />
          </div>
        </div>
      )}
    </>
  );
};

export default SignIn;
