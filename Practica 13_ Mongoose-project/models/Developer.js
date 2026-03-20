import mongoose from "mongoose";

const developerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minlength: 3,
  },
   email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
   experience: {
    type: Number,
    required: true,
    min: 0,
    max: 50,
  },