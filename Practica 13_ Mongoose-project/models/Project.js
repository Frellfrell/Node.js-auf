import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
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
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    validate: {
      validator: function (v) {
        return !v || v > this.startDate;
      },
        message: "endDate должен быть больше startDate",
    },
  },