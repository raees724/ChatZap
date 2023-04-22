const Conversation = require("../models/Conversation");

//new conv

module.exports = {
  createConversation: async (req, res) => {
    try {
      // Check if there is a conversation already existing between the two members
      const existingConvo = await Conversation.findOne({
        members: { $all: [req.body.senderId, req.body.receiverId] },
      });

      if (existingConvo) {
        console.log(existingConvo, "--------");
        return res.status(200).json(existingConvo);
      }

      const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
      });

      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //get conv of a user

  getConversation: async (req, res) => {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
