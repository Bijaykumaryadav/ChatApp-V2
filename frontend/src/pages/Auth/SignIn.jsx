// import axios from "axios";
import { useState } from "react";
// import { toast } from "react-toastify";
// import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //     };
  //     const data = await axios.post(
  //       "/api/v1/users/signIn",
  //       { email, password },
  //       config
  //     );
  //     console.log(data);

  //     if (data.status === 200) {
  //       toast.success("Signed In successfully!!");
  //       localStorage.setItem("user", JSON.stringify(data.data.data.user));
  //       navigate("/users/chat");
  //     } else if (data.status === 201) {
  //       toast.error("Email not verified");
  //     } else if (data.status === 202) {
  //       toast.error("Invalid password!!");
  //     } else {
  //       toast.error("Email not registered!");
  //     }
  //   } catch (error) {
  //     console.log("Error during signIn:", error.message);
  //   }
  // };

  // const handleGoogleSignIn = () => {
  //   window.location.href = "http://localhost:8000/api/v1/users/auth/google";
  // };

  return (
      <form
        className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl animate__animated animate__fadeIn  px-6 pb-6"
        // onSubmit={handleSubmit}
      >
        <label className="w-full mb-4">
          Email:
          <input
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Enter Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="w-full mb-4">
        <div className="flex items-center justify-between">
          <span className="w-auto">Password</span>
          <Link to="#" className="text-blue-500">
            Forgot Password
          </Link>
        </div>          
        <div className="relative">
            <input
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        //   onClick={handleGoogleSignIn}
        >
          <FcGoogle className="w-5 h-5 mr-2" />
          Login with Google
        </button>
        {/* <Link
          to="/users/forgotten-password"
          className="block mt-4 text-center text-gray-600 hover:underline"
        >
          Forgot Password?
        </Link> */}
      </form>
  );
};

export default SignIn;
