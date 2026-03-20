import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  age: {
    type: Number,
    min: 13,
    max: 120,
    required: true,
  },
  phone: {
    type: String,
    match: /^[0-9+\-() ]*$/,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
