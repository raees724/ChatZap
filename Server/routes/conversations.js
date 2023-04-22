const router = require("express").Router();
const Conversation = require("../models/Conversation");
const { verifyToken } = require("../middleware/auth.js");

const {
  createConversation,
  getConversation,
} = require("../controllers/conversation");
//new conv

router.post("/", verifyToken, createConversation);
router.get("/:userId", verifyToken, getConversation);

module.exports = router;
