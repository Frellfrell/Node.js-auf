import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});
