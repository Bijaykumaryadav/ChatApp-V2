const { sendResponse } = require("../../utils/sendResponse");
const {
  setInitialProfilePicture,
} = require("../../utils/setInitialProfilePicture");
const Otp = require("../../models/otpSchema");
const User = require("../../models/userSchema");
const { verifyUserEmail } = require("../../mailers/verifyUserEmail");
const { generateOTP } = require("../../utils/generateOtp");
const crypto = require("crypto");

module.exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return sendResponse(res, 404, false, "Please fill all the details", null, null);
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      if (!user.isVerified) {
        const otp = await generateOTP(user._id); // OTP for existing user
        user.otp = otp;
        await user.save();
        await verifyUserEmail(user, otp);
        return sendResponse(res, 409, false, "Please verify your email to continue");
      }
      return sendResponse(res, 409, false, "Account already exists", null, null);
    }

    // Create new user
    const profileImage = setInitialProfilePicture(name);
    user = new User({
      name,
      email,
      password,
      authToken: crypto.randomBytes(32).toString("hex"),
      profileImage,
    });

    const otp = await generateOTP(user._id); // Generate OTP and link to user
    user.otp = otp; // Save OTP in user schema (optional)
    await user.save();

    // Save OTP in Otp collection
    await Otp.create({ user: user._id, otp });

    // Send OTP via email
    await verifyUserEmail(user, otp);

    return sendResponse(res, 200, true, `OTP sent to ${email}`, { email }, null);
  } catch (error) {
    console.log("Error is:", error);
    return sendResponse(res, 500, false, "Internal server error", null, error);
  }
};

module.exports.verifyUser = async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp) {
      return sendResponse(res, 404, false, "OTP not found", null, null);
    }

    // Find the OTP in the Otp collection
    const otpRecord = await Otp.findOne({ otp });
    if (!otpRecord) {
      return sendResponse(res, 404, false, "Invalid OTP", null, null);
    }

    // Find the user associated with the OTP
    const user = await User.findById(otpRecord.user);
    if (!user) {
      return sendResponse(res, 404, false, "User does not exist", null, null);
    }

    // Mark the user as verified
    user.isVerified = true;
    await user.save();

    // Optionally, delete the OTP record after successful verification
    await Otp.deleteOne({ _id: otpRecord._id });

    return sendResponse(
      res,
      200,
      true,
      "Email verified successfully",
      null,
      null
    );
  } catch (error) {
    console.error(`Error in OTP verification: ${error}`);
    return sendResponse(res, 500, false, "OTP verification failed", null, {
      error,
    });
  }
};
