const express = require("express");
const {
  signUp,
  verifyUser,
  signInUser,
  googleSignUp,
  resetPasswordEmail,
  verifyResetOtp,
  updatePassword,
} = require("../../controllers/user/userController");
const passport = require("passport");

const router = express.Router();

router.post("/signup", signUp);
router.post("/verify", verifyUser);
router.post("/signin", signInUser);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  googleSignUp
);

router.get("/reset-password", resetPasswordEmail);
router.post("/verify-resetotp", verifyResetOtp);
router.post("/update-password",updatePassword);

module.exports = router;