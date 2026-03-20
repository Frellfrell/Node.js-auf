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
  industry: {
    type: String,
    enum: ["IT", "Finance", "Healthcare", "Education", "Retail"],
    required: true,
  },
  employeeCount: {
    type: Number,
    required: true,
    min: 1,
  },
  website: {
    type: String,
    match: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*$/,
  },
});

const Company = mongoose.model("Company", companySchema);

export default Company;
