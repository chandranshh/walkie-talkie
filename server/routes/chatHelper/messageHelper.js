// Message route
const express = require("express");
const router = express.Router();
const Conversation = require("../../models/Conversation");
const User = require("../../models/Users");
const Message = require("../../models/Message");

// Send a message
router.post("/", async (req, res) => {
  const { roomId, senderId, content } = req.body;

  try {
    // Check if the conversation exists
    const conversation = await Conversation.findById(roomId);

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // Check if the sender is a member of the conversation
    if (!conversation.members.includes(senderId)) {
      return res
        .status(403)
        .json({ error: "You are not a member of this conversation" });
    }

    // Create a new message
    const newMessage = new Message({
      roomId,
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
