import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Util from "../../../helpers/Util";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function VerifyPage({ email, setShowOverlay }) {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
    try {
      Util.call_Post_by_URI(
        "users/verify",
        { otp },
        (res, status) => {
          if (status && res?.success) {
            toast.success(res.message, { autoClose: 2000 });
            setTimeout(() => {
              navigate(0);
            }, 2000);
          } else {
            toast.error(res.message, { autoClose: 2000 });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  // New function to handle resend code
  const handleResendCode = () => {
    Util.call_Post_by_URI(
      "users/resend-otp",
      { email },
      (res, status) => {
        if (status && res?.success) {
          toast.success("Verification code resent successfully", { autoClose: 2000 });
        } else {
          toast.error(res?.message || "Failed to resend verification code");
        }
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#D9D9D9] shadow-lg min-w-[280px] xs:w-full xs:max-w-xs sm:max-w-[424px] md:max-w-[424px] border border-blue-500 rounded-md overflow-hidden transition-all duration-300 pb-6">
      <div className="w-full p-4">
        <h2 className="text-[20px] leading-[28px] mb-4 flex justify-center">
          Verify Your Email Address
        </h2>
        <p className="mb-4 text-[14px] leading-[20px] text-[#5F6C72] text-center break-words w-full max-w-[360px]">
          Please enter the verification code sent to {email}.
        </p>

        <form className="flex flex-col items-center space-y-4 w-full max-w-[360px]" onSubmit={handleVerify}>
          <label className="relative w-full" htmlFor="otp">
            <div className="flex justify-between items-center text-[14px] leading-[20px] text-[#191c1f]">
              <span>Verification Code</span>
              <Link to="#" onClick={handleResendCode} className="text-blue-500">
                Resend Code
              </Link>
            </div>
            <input
              className="w-full px-4 py-2 h-[44px] border border-blue-500 rounded-lg mt-[8px] bg-[#D9D9D9] focus:ring-2 focus:border-blue-500 outline-none shadow-lg"
              id="otp"
              type="text"
              required
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
            />
          </label>
          <button
            className="flex justify-center items-center w-full text-[14px] leading-[48px] mt-[16px] font-semibold text-[#ffffff] h-[48px] transition-colors duration-300 bg-blue-500 hover:bg-blue-800 tracking-[1.2%] rounded-[15px]"
          >
            VERIFY ME &nbsp;
          </button>
          <button
            type="button"
            className="flex justify-center items-center w-full mt-4 text-red-500 font-semibold hover:text-red-700"
            onClick={() => setShowOverlay(false)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyPage;
