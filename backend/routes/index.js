const express = require("express");
const authRoute = require("./user/authRouter");
const messageRoute = require("./messages/messageRouter");
const router = express.Router();

router.use("/users", authRoute);
router.use("/chats", messageRoute);

module.exports = router;