import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  description: {
    type: String,
    required: true,
    minlength: 20,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
  },
   category: {
    type: String,
    enum: ["consulting", "development", "support", "training"],
    required: true,
  },
  level: {
    type: String,
    enum: ["basic", "premium", "enterprise"],
    required: true,
  },