// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Note = require("./models/Note");

const app = express();

// --- middleware ---
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// --- connect to mongo ---
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/notesapp";
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// --- Auth routes ---
app.post("/api/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Username and password required" });

    const existing = await User.findOne({ username });
    if (existing)
      return res.status(400).json({ message: "Username already taken" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ username, password: hash });
    // never send back password
    res.status(201).json({ user: { _id: user._id, username: user.username } });
  } catch (err) {
    console.error("signup error", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Username and password required" });

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    res.json({ user: { _id: user._id, username: user.username } });
  } catch (err) {
    console.error("login error", err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Notes CRUD ---
// Get notes by username
app.get("/api/notes/:user", async (req, res) => {
  try {
    const user = req.params.user;
    const notes = await Note.find({ user }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error("get notes error", err);
    res.status(500).json({ error: err.message });
  }
});

// Create note
app.post("/api/notes", async (req, res) => {
  try {
    // expect body to include { user, content, color, colorLabel, ... }
    const payload = req.body;
    if (!payload || !payload.user)
      return res.status(400).json({ message: "user is required" });

    const note = await Note.create(payload);
    res.status(201).json(note);
  } catch (err) {
    console.error("create note error", err);
    res.status(500).json({ error: err.message });
  }
});

// Update note (partial updates supported)
app.put("/api/notes/:id", async (req, res) => {
  try {
    const updates = req.body || {};
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    console.error("update note error", err);
    res.status(500).json({ error: err.message });
  }
});

// Delete note
app.delete("/api/notes/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "deleted" });
  } catch (err) {
    console.error("delete note error", err);
    res.status(500).json({ error: err.message });
  }
});

// Optional: distinct color labels for a user (helpful if you want to rebuild a palette)
app.get("/api/labels/:user", async (req, res) => {
  try {
    const user = req.params.user;
    const pipeline = [
      { $match: { user, colorLabel: { $exists: true, $ne: "" } } },
      { $group: { _id: "$colorLabel", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ];
    const agg = await Note.aggregate(pipeline);
    const labels = agg.map((x) => ({ label: x._id, count: x.count }));
    res.json(labels);
  } catch (err) {
    console.error("labels error", err);
    res.status(500).json({ error: err.message });
  }
});

// fallback - serve index (optional)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
