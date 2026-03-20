import mongoose from "mongoose";

const jobListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    minlength: 50,
  },
  requirements: {
    type: [String],
    required: true,
    validate: [
      arr => arr.length >= 1 && arr.length <= 10,
      "От 1 до 10 требований",
    ],
  },