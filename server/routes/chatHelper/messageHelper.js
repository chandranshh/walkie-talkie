// Message route
const express = require("express");
const router = express.Router();
const Conversation = require("../../models/Conversation");
const User = require("../../models/Users");
const Message = require("../../models/Message");

// Send a message
router.post("/", async (req, res) => {
  const { senderId, receiverId, content } = req.body;

  try {
    // Check if a conversation already exists between sender and receiver
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      // If conversation doesn't exist, create a new conversation
      const newConversation = new Conversation({
        members: [senderId, receiverId],
      });

      conversation = await newConversation.save();
    }

    // Create a new message
    const newMessage = new Message({
      roomId: conversation._id,
      sender: senderId,
      content,
    });

    const savedMessage = await newMessage.save();
    res.json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all messages in a conversation
router.get("/:roomId", async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.roomId);

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const messages = await Message.find({ roomId: req.params.roomId });
    res.json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
