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
  budget: {
    type: Number,
    required: true,
    min: 1000,
  },
  status: {
    type: String,
    enum: ["planning", "active", "completed", "cancelled"],
    required: true,
  },
  technologies: {
    type: [String],
    required: true,
    validate: [(arr) => arr.length >= 1, "Минимум 1 технология"],
  },
  developers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Developer",
    },
  ],
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
