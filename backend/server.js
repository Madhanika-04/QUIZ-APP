const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
//middleware
app.use(express.json());
app.use(cors());

const path = require("path");
app.use(express.static(path.join(__dirname, "..")));


// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/quizDB")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error:", err));

// Schema
const scoreSchema = new mongoose.Schema({
  username: String,
  score: Number,
  date: { type: Date, default: Date.now }},{versionKey:false}
);

// Model
const Score = mongoose.model("Score", scoreSchema);

// Route to save score
app.post("/submit-score", async (req, res) => {
  const { username, score } = req.body;

  try {
    const newScore = new Score({ username, score });
    await newScore.save();
    res.json({ message: "Score saved!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

