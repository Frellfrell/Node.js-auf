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

app.post("/categories", async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/categories", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

app.post('/products', async (req, res) => {
    try {
        let { name, price, category } = req.body;

        if (!mongoose.Types.ObjectId.isValid(category)) {
            const foundCategory = await Category.findOne({ name: category });

            if (!foundCategory) {
                return res.status(404).json({ error: "Category not found by name" });
            }
            category = foundCategory._id;
        }

