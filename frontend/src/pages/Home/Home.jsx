import { useState } from "react";
import SignUp from "../Auth/SignUp";
import SignIn from "../Auth/SignIn";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("signIn");

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600">
      <h1 className="mb-8 text-4xl font-extrabold text-center text-white animate__animated animate__fadeInDown sm:text-5xl md:text-6xl">
        Welcome to ChatApp
      </h1>
      <p className="mb-8 text-lg text-center text-white animate__animated animate__fadeInUp sm:text-xl md:text-2xl">
        Connect, collaborate, and communicate effortlessly.
      </p>
      <div className="flex items-center justify-center p-1 mb-8 bg-white border border-gray-300 rounded-full shadow-lg">
        {/* Sign In button */}
        <button
          className={`w-32 py-2 text-sm font-semibold rounded-full transition-colors duration-300 sm:w-40 ${
            activeTab === "signIn"
              ? "bg-blue-500 text-white"
              : "bg-transparent text-gray-800"
          }`}
          onClick={() => handleTabSwitch("signIn")}
        >
          Sign In
        </button>
        {/* Sign Up button */}
        <button
          className={`w-32 py-2 text-sm font-semibold rounded-full transition-colors duration-300 sm:w-40 ${
            activeTab === "signUp"
              ? "bg-blue-500 text-white"
              : "bg-transparent text-gray-800"
          }`}
          onClick={() => handleTabSwitch("signUp")}
        >
          Sign Up
        </button>
      </div>

      {/* Form container */}
      <div className="w-full max-w-xl p-6 bg-white border border-gray-300 rounded-lg shadow-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl animate__animated animate__fadeIn">
        {activeTab === "signIn" ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
};

export default HomePage;
