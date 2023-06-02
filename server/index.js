const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables from .env file
dotenv.config();

// Create Express server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

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

//port listening
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
