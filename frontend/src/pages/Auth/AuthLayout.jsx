import React from "react";

function AuthLayout({ children }) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600">
      <h1 className="mb-8 text-4xl font-extrabold text-center text-white animate__animated animate__fadeInDown sm:text-5xl md:text-5xl xl:text-6xl">
        Welcome to ChatApp
      </h1>
      <p className="mb-8 text-lg text-center text-white animate__animated animate__fadeInUp sm:text-xl md:text-2xl">
        Connect, collaborate, and communicate effortlessly.
      </p>

      {/* Form container */}
      <div className="w-full max-w-xl bg-white border border-gray-300 rounded-lg shadow-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl animate__animated animate__fadeIn">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
