const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  complete: { type: Boolean, default: false },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
