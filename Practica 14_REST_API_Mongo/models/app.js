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

app.post("/products", async (req, res) => {
  try {
    let { name, price, category } = req.body;

    if (!mongoose.Types.ObjectId.isValid(category)) {
      const foundCategory = await Category.findOne({ name: category });

      if (!foundCategory) {
        return res.status(404).json({ error: "Category not found by name" });
      }
      category = foundCategory._id;
    }

    const product = new Product({ name, price, category });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/products", async (req, res) => {
  try {
    const { category, sortBy } = req.query;
    let filter = {};

    if (category) {
      const foundCat = await Category.findOne({ name: category });
      if (foundCat) filter.category = foundCat._id;
    }

    let query = Product.find(filter).populate("category");
    if (sortBy === "price") query = query.sort({ price: 1 });

    const products = await query;
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Получение одного продукта с деталями категории
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
