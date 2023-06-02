const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { Server } = require("socket.io");

// Load environment variables from .env file
dotenv.config();

// Create Express server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    credentials: true,
    transport: ["websocket"],
  })
);

//test
app.get(`/`, (req, res) => {
  res.send("API is working");
});

// Connect to MongoDB
require("./connection");

// Routes
app.use("/api/auth/register", require("./routes/userAuth/register"));
app.use("/api/auth/login", require("./routes/userAuth/login"));
app.use("/api/users", require("./routes/fetchUser/fetchUser"));

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`Express server listening on port: ${port}`);
});
