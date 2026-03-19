import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    complete: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
