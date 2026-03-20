import mongoose from "mongoose";

const productCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },