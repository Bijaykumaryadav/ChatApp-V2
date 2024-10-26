const { sendResponse } = require("../../utils/sendResponse");
const {
  setInitialProfilePicture,
} = require("../../utils/setInitialProfilePicture");
const Otp = require("../../models/otpSchema");
const User = require("../../models/userSchema");
const { verifyUserEmail } = require("../../mailers/verifyUserEmail");
const { generateOTP } = require("../../utils/generateOtp");
const { resetPasswordEmail } = require("../../mailers/resetPasswordEmail");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

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
    // await Otp.create({ user: user._id, otp });

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
      return sendResponse(res, 404, false, "Invalid OTP or Expired Otp", null, null);
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

module.exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return sendResponse(res, 400, false, "Email is required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, 404, false, "User not found");
    }

    if (user.isVerified) {
      return sendResponse(res, 400, false, "User is already verified");
    }

    const otp = await generateOTP(user._id);
    await Otp.updateOne({ user: user._id }, { otp }, { upsert: true });

    // Send the OTP email
    await verifyUserEmail(user, otp);

    return sendResponse(res, 200, true, `Verification code resent to ${email}`);
  } catch (error) {
    console.error("Error resending OTP:", error);
    return sendResponse(res, 500, false, "Failed to resend verification code");
  }
};


//Sign in user
module.exports.signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return sendResponse(
        res,
        400,
        false,
        "Please fill all the details",
        null,
        null
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, 404, false, "User doesnot exist");
    }
    if (!user.isVerified) {
      const otp = await generateOTP(user._id);
      verifyUserEmail(user, otp);
    }
    const isMatched = await await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return sendResponse(res, 409, false, "Password mismatch");
    }
    const token = await jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY,{
      expiresIn: "30d",
    });
    return sendResponse(res, 200, true, "login successfull", { token }, null);
  } catch (error) {
    console.error(`Error in login ${error}`);
    return sendResponse(res, 500, false, "Error in login", null, {
      error,
    });
  }
};

module.exports.resetPasswordEmail = async(req,res) => {
  try{
    const {email} = req.body;
    if(!email){
      return sendResponse(res,400,false,"Please Enter the associated Email with account");
    }

    const user = await User.findOne({email});

    if(!user){
      return sendResponse(res,404,false,"Account doesnot exist");
    }

    const otp = await generateOTP(user._id);
    user.otp = otp;
    await user.save();
    resetPasswordEmail(user,otp);
    return sendResponse(res,200,true,"Reset password email sent successfully");
  }catch(error){
    console.log("Error in sending reset password email",error);
    return sendResponse(res,500,false,"Internal server error");
  }
}

module.exports.verifyResetOtp = async (req, res) => {
  try {
    const { otp } = req.body;

    if (!otp) {
      return sendResponse(res, 400, false, "OTP is required");
    }

    // Find the OTP in the Otp collection
    const otpRecord = await Otp.findOne({ otp });
    if (!otpRecord) {
      return sendResponse(res, 404, false, "Invalid OTP or OTP has expired");
    }

    // Find the user associated with the OTP
    const user = await User.findById(otpRecord.user);
    if (!user) {
      return sendResponse(res, 404, false, "User does not exist");
    }
    //for otp mismatch
    if (user.otp.toString() !== otp) {
      return sendResponse(res, 404, false, "Otp mismatch", null, null);
    }

    // OTP matched successfully; delete OTP and return user ID for frontend storage
    await Otp.deleteOne({ _id: otpRecord._id });
    return sendResponse(
      res,
      200,
      true,
      "OTP verified successfully",
      { userId: user._id },
      null
    );
  } catch (error) {
    console.error(`Error verifying OTP: ${error}`);
    return sendResponse(res, 500, false, "Internal server error");
  }
};

module.exports.updatePassword = async (req, res) => {
  try {
    const { userId, password, confirmPassword } = req.body;

    if (!password || !confirmPassword || password !== confirmPassword) {
      return sendResponse(res, 400, false, "Passwords do not match");
    }

    // Find the user by `userId`
    const user = await User.findById(userId);
    if (!user) {
      return sendResponse(res, 404, false, "User does not exist");
    }

    // Update the password (it will be hashed by the pre-save hook)
    user.password = password;
    await user.save();

    return sendResponse(res, 200, true, "Password updated successfully");
  } catch (error) {
    console.error(`Error updating password: ${error}`);
    return sendResponse(res, 500, false, "Internal server error");
  }
};



module.exports.googleSignUp = function (req, res) {
  const { _id, name, email } = req.user;
  const token = jwt.sign(req.user.toJSON(), process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
  const userData = {
    id: _id,
    name,
    email,
    token,
  };
  console.log(userData);
  const queryParams = new URLSearchParams(userData).toString();

  res.redirect(
    `${process.env.FRONTEND_URL}/users/auth/googleCallback?${queryParams}`
  );
};

// send user details
module.exports.sendUserDetails = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId)
      .select(
        "name  email profileImage token"
      )
    if (user) {
      return sendResponse(res, 200, true, "User found", { user }, null);
    }
    return sendResponse(res, 404, "User not found sign up please", null, null);
  } catch (error) {
    console.error(`Error in sending user details ${error}`);
    return sendResponse(res, 500, false, "Error in login", null, {
      error,
    });
  }
};