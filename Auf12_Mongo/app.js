import express from "express";
import { connectToDB, getDB } from "./db/index.js";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// POST /products - Добавление нового продукта
app.post("/products", async (req, res) => {
    try {
        const db = getDB();
        if (!db) {
            return res.status(500).json({ error: "Database not connected" });
        }

        const { name, price, description } = req.body;
        if (!name || !price) {
            return res.status(400).json({ error: "Name and price are required" });
        }

        const newProduct = { name, price, description };
        const result = await db.collection("products").insertOne(newProduct);
        return res.status(201).json({ message: "Product created", productId: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

// GET /products - Получение списка всех продуктов
app.get("/products", async (_req, res) => {
    try {
        const db = getDB();
        if (!db) {
            return res.status(500).json({ error: "Database not connected" });
        }
        const products = await db.collection("products").find({}).toArray();
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error GET/products:", error.message);
        
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});
// GET /products/:id - Получение продукта по ID
app.get("/products/:id", async (req, res) => {
    try { 
        const db = getDB();
        if (!db) {
            return res.status(500).json({ error: "Database not connected" });

        }
        const { id } = req.params.id;
         
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid product ID" });
        }
        const product = await db.collection("products").findOne({ _id: new ObjectId(id) });
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        return res.status(200).json(product);
    } catch (error) {
        console.error("Error GET/products/:id:", error.message);
        
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});