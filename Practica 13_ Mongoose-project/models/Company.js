import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
   taxId: {
    type: String,
    required: true,
    unique: true,
    match: /^\d{10,12}$/,
  },