const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Users = require("../../models/Users");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const jwt_secret = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user object
    const newUser = new Users({
      email,
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Create a token
    jwt.sign(
      {
        _id: savedUser._id,
        email: savedUser.email,
      },
      jwt_secret,
      { expiresIn: 86000 },
      (err, token) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Server error" });
        }
        newUser.token = token;
        newUser.save();
        res
          .cookie("token", token)
          .status(200)
          .json({
            token,
            user: {
              _id: savedUser._id,
              email: savedUser.email,
              username: savedUser.username,
            },
          });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
