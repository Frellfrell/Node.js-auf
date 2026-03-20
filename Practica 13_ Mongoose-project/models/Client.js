import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    minlength: 2,
  },
  contactPerson: {
    type: String,
    required: true,
    minlength: 3,
  },
  phone: {
    type: String,
    required: true,
    match: /^\+\d{1}\s\(\d{3}\)\s\d{3}-\d{4}$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  contractSigned: Date,
  status: {
    type: String,
    enum: ["active", "inactive", "pending"],
    default: "pending",
  },
});

const Client = mongoose.model("Client", clientSchema);

export default Client;
