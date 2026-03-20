import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 5,
    maxlength: 200,
    required: true,
  },
  content: {
    type: String,
    minlength: 20,
    required: true,
  },
  status: {
    type: String,
    enum: ["draft", "published", "archived"],
    default: "draft",
  },
  views: {
    type: Number,
    default: 0,
    min: 0,
  },
  tags: {
    type: [String],
    validate: [(arr) => arr.length <= 5, "Максимум 5 тегов"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
