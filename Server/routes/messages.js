const router = require("express").Router();
const Message = require("../models/Message");
const { addMessage, getMessage } = require("../controllers/message");
const { verifyToken } = require("../middleware/auth.js");

//add
router.post("/", addMessage);
router.get("/:conversationId", verifyToken, getMessage);

module.exports = router;
