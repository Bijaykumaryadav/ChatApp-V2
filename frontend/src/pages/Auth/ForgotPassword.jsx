import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OtpPage from './OtpPage';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [showOverlay,setShowOverlay] = useState(false);

  const handleCancel = () => {
    navigate('/'); // Redirect to home page
  };

  const handleoverlay = () => {
    setShowOverlay(!showOverlay);
  };

  // Function to close overlay when clicking outside the modal
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("overlay-background")) {
      setShowOverlay(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-xl shadow-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-lg border border-blue-500 bg-[#d9d9d9] pb-6">
        <div className="w-full p-4">
          <h2 className="text-[20px] leading-[28px] mb-4 flex justify-center">
            Reset Password
          </h2>
          <p className="mb-4 text-[14px] leading-[20px] text-[#5F6C72] text-center break-words w-full">
            Enter Your Email Address Associated With Your Account
          </p>
          <form className="flex flex-col items-center w-full space-y-4">
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
            <button
              className="flex justify-center items-center w-full text-[14px] leading-[48px] mt-[16px] font-semibold text-[#ffffff] h-[48px] transition-colors duration-300 bg-blue-500 hover:bg-blue-800 tracking-[1.2%] rounded-[15px]"
              type="submit"
              onClick={handleoverlay}
            >
              SEND OTP
            </button>
            <button
              className="flex justify-center items-center w-full text-[14px] leading-[48px] mt-[16px] font-semibold text-blue-500 h-[48px] transition-colors duration-300 bg-white hover:bg-gray-200 tracking-[1.2%] rounded-[15px] border border-blue-500"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </form>
          {/* Overlay for the verification code */}
          {showOverlay && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overlay-background"
              onClick={handleOverlayClick}
            >
              <div className="w-full p-6 bg-white rounded-lg min-h-[300px] min-w-[300px] xs:max-w-[300px] sm:max-w-[424px] md:max-w-[424px]">
                <OtpPage email={email} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;