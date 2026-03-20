import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    minlength: 2,
  },