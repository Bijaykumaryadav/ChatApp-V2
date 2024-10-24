const express = require("express");
const authRoute = require("./user/authRouter");
const router = express.Router();

router.use("/users", authRoute);

module.exports = router;