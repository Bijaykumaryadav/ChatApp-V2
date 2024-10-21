import React from 'react'
import { Link } from "react-router-dom";

function VerifyPage({email}) {
  const [Number, setNumber] = useState("");
  return (
    <div className="flex flex-col items-center justify-center bg-[#D9D9D9] shadow-lg min-w-[280px] xs:w-full xs:max-w-xs sm:max-w-[424px] md:max-w-[424px] border border-[#896B59] rounded-md overflow-hidden transition-all duration-300 pb-6">
      {/* Form Content */}
      <div className="p-4 w-full">
        <h2 className="text-[20px] leading-[28px] mb-4 flex justify-center">
          Verify Your Email Address
        </h2>
        <p className="mb-4 text-[14px] leading-[20px] text-[#5F6C72] text-center break-words w-full max-w-[360px]">
          Please enter the verification code sent to {email}.
        </p>

        <form className="flex flex-col items-center space-y-4 w-full max-w-[360px]">
          <label className="relative w-full">
            <div className="flex justify-between items-center text-[14px] leading-[20px] text-[#191c1f]">
              <span>Verification Code</span>
              <Link to="#" className="text-[#896B59]">
                Resend Code
              </Link>
            </div>
            <input
              className="w-full px-4 py-2 h-[44px] border border-[#896B59] rounded-[15px] mt-[8px] bg-[#D9D9D9] focus:border-2 focus:border-[#896B59] outline-none"
              type="text"
              required
              onChange={(e) => setNumber(e.target.value)}
              value={Number}
            />
          </label>
          <button
            className="flex justify-center items-center w-full text-[14px] leading-[48px] mt-[16px] font-semibold text-[#ffffff] h-[48px] transition-colors duration-300 bg-[#896B59] hover:bg-[#5b4234] tracking-[1.2%] rounded-[15px]"
            onClick={handleVerify}
          >
            VERIFY ME &nbsp;
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyPage;