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
  isActive: {
    type: Boolean,
    default: true,
  },
  displayOrder: {
    type: Number,
    required: true,
    min: 1,
    max: 999,
  },
});
