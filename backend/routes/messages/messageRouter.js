const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  sendMessage,
  fetchAllMessages,
} = require("../../controllers/messages/messageController");
const {
  oneToOneChat,
  fetchChat,
} = require("../../controllers/chat/chatController");

router.post(
  "/",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/",
  }),
  oneToOneChat
);

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/",
  }),
  fetchChat
);

router.post(
  "/message",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  sendMessage
);

router.get(
  "/message/:chatId",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  fetchAllMessages
);

module.exports = router;