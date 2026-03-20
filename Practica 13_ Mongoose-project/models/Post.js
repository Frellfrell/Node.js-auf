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