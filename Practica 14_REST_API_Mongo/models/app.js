import express from "express";
import mongoose from "mongoose";
import Product from "./models/Product.js";
import Category from "./models/Category.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Connection Error:", err));
