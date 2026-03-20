import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
   sku: {
    type: String,
    required: true,
    unique: true,
    match: /^[A-Z]{3}\d{5}$/,
  },
  price: {
    type: Number,
    required: true,
    min: 0.01,
  },