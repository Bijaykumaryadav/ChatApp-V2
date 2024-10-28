const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  sendMessage,
  fetchAllMessages,
} = require("../../controllers/messages/messageController");

router.post(
  "/chat/message",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  sendMessage
);

router.get(
  "/chat/message/:chatId",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  fetchAllMessages
);

module.exports = router;