import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
      <form
        className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl animate__animated animate__fadeIn"
        // onSubmit={handleSubmit}
      >
        <h1 className="mb-6 text-2xl font-semibold text-center text-gray-900">
          Sign Up
        </h1>
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
          Username:
          <input
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter Username"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="w-full mb-4">
          Password:
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
          Sign Up
        </button>
        <button
          type="button"
          className="flex items-center justify-center w-full px-4 py-2 mt-4 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
          // onClick={handleGoogleSignIn}
        >
          <FcGoogle className="w-5 h-5 mr-2" />
          Login with Google
        </button>
      </form>
  );
};

export default SignUp;