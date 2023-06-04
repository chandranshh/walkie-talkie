const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// Load environment variables from .env file
dotenv.config();

// Create Express server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS
app.use(cors());

// Connect to MongoDB
require("./connection");

// Routes
app.use("/api/auth/register", require("./routes/userAuth/register"));
app.use("/api/auth/login", require("./routes/userAuth/login"));
app.use("/api/users", require("./routes/fetchUser/fetchUser"));
app.use("/api/chat", require("./routes/chatHelper/startConvo"));
app.use("/api/message", require("./routes/chatHelper/messageHelper"));

const port = process.env.PORT || 3001;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Server-side code
let users = [];

io.on("connection", (socket) => {
  socket.on("connected", (data) => {
    const existingUser = users.find((user) => user._id === data._id);
    if (!existingUser) {
      if (data._id) {
        const newUser = {
          _id: data._id,
          username: data.username,
          email: data.email,
          socketId: socket.id,
        };
        users.push(newUser);
        io.emit("newUser", newUser); // Emit the newUser event to all clients except the newly connected client
        io.emit("users", users);
      }
      console.log(users);
    }
  });

  socket.on("sendMessage", (data) => {
    const receiver = users.find((user) => user._id === data.receiver);
    if (receiver) {
      io.to(receiver.socketId).emit("newMessage", data);
    }
  });

  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit("userLeft", socket.id); // Emit the disconnected user's socketId to clients
    io.emit("logout", socket.id); // Emit the disconnected user's socketId to clients
    console.log(users);
  });
});
