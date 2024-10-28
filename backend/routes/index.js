const express = require("express");
const authRoute = require("./user/authRouter");
const chatRoute = require("./chat/chatRouter");
const router = express.Router();

router.use("/users", authRoute);
router.use("/chats",chatRoute);

module.exports = router;