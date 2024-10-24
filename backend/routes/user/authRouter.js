const express = require("express");
const {
  signUp,
  verifyUser,
} = require("../../controllers/user/userController");
const router = express.Router();

router.post("/signup", signUp);
router.post("/verification", verifyUser);

module.exports = router;