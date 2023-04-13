
const Message = require("../models/Message");

module.exports = {

  //add
  
addMessage: async (req, res) => {
  const newMessage = new Message(req.body);
  console.log("Req.body of conversation",req.body)

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
},

//get
getMessage: async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
},
}
