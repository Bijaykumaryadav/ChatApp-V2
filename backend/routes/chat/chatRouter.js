const express = require("express");
const router = express.Router();
const {
  sendMessage,
  fetchAllMessages,
} = require("../../controllers/messages/messageController");

module.exports = router;