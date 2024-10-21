import { useState } from "react";
import SignUp from "../Auth/SignUp";
import SignIn from "../Auth/SignIn";
import AuthLayout from "../Auth/AuthLayout";

const Home = () => {
  const [activeTab, setActiveTab] = useState("signIn");

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <AuthLayout>
      {/* Button Switching */}
      <div className="flex items-center justify-center w-full mb-4 border border-blue-500 rounded-lg shadow-lg">
        {/* Sign In Button */}
        <button
          className={`flex-grow h-[60px] flex items-center justify-center font-semibold transition-colors duration-300 text-[20px] leading-[28px] border border-x-transparent border-r-blue-500 border-l-transparent ${
            activeTab === "signIn"
              ? "text-[#896B59]"
              : "text-black hover:bg-[#A8A8A8] border-b-transparent"
          }`}
          onClick={() => handleTabSwitch("signIn")}
        >
          Sign In
        </button>

        {/* Sign Up Button */}
        <button
          className={`flex-grow h-[60px] flex items-center justify-center font-semibold transition-colors duration-300 text-[20px] leading-[28px] ${
            activeTab === "signUp"
              ? "text-[#896B59] border-b-[#896B59]"
              : "text-black hover:bg-[#A8A8A8] border-b-transparent"
          }`}
          onClick={() => handleTabSwitch("signUp")}
        >
          Sign Up
        </button>
      </div>

      {/* Form Content */}
      {activeTab === "signIn" ? <SignIn /> : <SignUp />}
    </AuthLayout>
  );
};

export default Home;
