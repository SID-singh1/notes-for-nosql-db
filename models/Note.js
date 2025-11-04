// models/Note.js
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    user: { type: String, required: true }, // username string
    content: { type: String, default: "" },
    color: { type: String, default: "#ffffff" }, // note background color (hex)
    colorLabel: { type: String, default: "" }, // label attached to color swatch
    // optional visual fields kept but not required by grid-only UI:
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    width: { type: Number, default: 250 },
    height: { type: Number, default: 150 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
