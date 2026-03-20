import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0.01,
  },
  totalPrice: Number,
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    match: /^ORD-\d{8}-\d{6}$/,
  },
   customer: {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: /^\S+@\S+\.\S+$/,
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9+\-() ]*$/,
    },
  },