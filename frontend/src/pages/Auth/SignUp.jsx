import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import VerifyPage from "./VerifyPage";
import { toast } from "react-toastify";
import Util from "../../../helpers/Util";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showOverlay,setShowOverlay] = useState(false);

const handleSignUp = async (e) => {
  e.preventDefault();

  // Proceed with sign-up if validations pass
  try {
    Util.call_Post_by_URI(
      "users/signup",
      {
        name,
        email,
        password,
      },
      (res, status) => {
        if (status && res?.success) {
          toast.success("Please verify your email.", {
            autoClose: 2000,
          });
          setShowOverlay(true); 
        } else if (res?.message === "Please verify your email to continue") {
          // Only show the toast if it's not already showing
          // toast.info("Please verify your email to continue.", {
          //   autoClose: 2000,
          // });
          setShowOverlay(true);
        } else if(res?.message === "Account already exists"){
          toast.error(res?.message === "User already exists");
          clearForm();
        }else{
          toast.error(res?.message || "Sign-up failed.");
          clearForm(); // Clear the form fields
        }
      }
    );
  } catch (error) {
    clearForm(); // Clear the form fields
    console.log(error);
    toast.error("Something went wrong. Please try again.");
  }
};

  // // Function to close overlay when clicking outside the modal
  // const handleOverlayClick = (e) => {
  //   if (e.target.classList.contains("overlay-background")) {
  //     setShowOverlay(false);
  //   }
  // };

  // Function to clear form fields
  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

    const handleGoogleSignIn = () => {
      window.location.href = "http://localhost:8000/apis/v1/users/auth/google";
    };

  return (
    <>
      <form
        className="w-full px-6 pb-6 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl animate__animated animate__fadeIn"
        onSubmit={handleSignUp}
      >
        <label className="w-full mb-4" htmlFor="email">
          Email:
          <input
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
            type="email"
            name="email"
            value={email}
            placeholder="Enter Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="w-full mb-4" htmlFor="name">
          <div className="mt-2">Username:</div>
          <input
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="name"
            name="name"
            value={name}
            type="text"
            placeholder="Enter Username"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="w-full mb-4" htmlFor="password">
          <div className="mt-2">Password:</div>
          <div className="relative">
            <input
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
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
          Sign Up
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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overlay-background"
          // onClick={handleOverlayClick}
        >
          <div className="w-full p-6 bg-white rounded-lg min-h-[300px] min-w-[300px] xs:max-w-[300px] sm:max-w-[424px] md:max-w-[424px]">
            <VerifyPage email={email} setShowOverlay={setShowOverlay} />
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;