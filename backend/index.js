const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Initialize dotenv to load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Import routes
const userRoutes = require("./userRoutes");

// Middleware setup
app.use(cors());
app.use(express.json());

// Register user routes
app.use("/api/users", userRoutes); // Correct the route to '/users'

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Example route
app.get("/", (req, res) => {
  res.send("Backend Connected Successfully");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
