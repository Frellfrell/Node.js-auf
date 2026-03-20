import mongoose from "mongoose";

const productCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
   slug: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-z-]+$/,
  },
  description: {
    type: String,
    maxlength: 500,
  },