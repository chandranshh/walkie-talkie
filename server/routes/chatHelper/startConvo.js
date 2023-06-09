// This will create a conversation between a sender and receiver
const express = require("express");
const router = express.Router();
const Conversation = require("../../models/Conversation");
const User = require("../../models/Users");

// Create a new conversation
router.post("/", async (req, res) => {
  const senderId = req.body.senderId;
  const receiverId = req.body.receiverId;

  try {
    // Check if a conversation already exists between sender and receiver
    const existingConversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (existingConversation) {
      // If conversation already exists, return the existing conversation details
      return res.json({
        members: existingConversation.members,
        roomId: existingConversation._id,
      });
    }

    // If conversation doesn't exist, create a new conversation
    const newConversation = new Conversation({
      members: [senderId, receiverId],
    });

    const savedConversation = await newConversation.save();
    res.json({
      members: newConversation.members,
      roomId: savedConversation._id,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all conversations of a user (for the sidebar)
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const convos = await Conversation.find({
      members: {
        $in: [userId],
      },
    });
    const convoUserData = Promise.all(
      convos.map(async (convo) => {
        const receiverId = await convo.members.find(
          (member) => member !== userId
        );
        const user = await User.findById(receiverId);
        return {
          user: {
            username: user.username,
            email: user.email,
            _id: user._id,
          },
          roomId: convo._id,
        };
      })
    );
    res.status(200).json(await convoUserData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
