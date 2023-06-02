const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { log } = require("console");

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

let users = [];

io.on("connection", (socket) => {
  socket.on("connected", (data) => {
    const existingUser = users.find((user) => user._id === data._id);
    if (!existingUser) {
      users.push({
        _id: data._id,
        username: data.username,
        email: data.email,
        socketId: socket.id,
      });
    }
    socket.emit("users", users); // Emit the updated users array

    console.log(users); // Log the updated users array
  });
});
