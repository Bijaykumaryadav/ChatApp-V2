const express = require("express");
const authRoute = require("./user/authRouter");
const router = express.Router();

router.use("/users", authRoute);
router.use("/chats",chatRoute);

module.exports = router;