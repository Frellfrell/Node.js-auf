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
  skills: {
    type: [String],
    required: true,
    validate: [
      arr => arr.length >= 1 && arr.length <= 10,
      "От 1 до 10 навыков",
    ],
  },
  hourlyRate: {
    type: Number,
    required: true,
    min: 10,
    max: 200,
  },