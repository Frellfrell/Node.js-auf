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
        const id  = req.params.id;
         
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

// PUT /products/:id - Обновление продукта по ID
app.put("/products/:id", async (req, res) => {
    try {
        const db = getDB();
        if (!db) {
            return res.status(500).json({ error: "Database not connected" });
        }
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid product ID" });
        }
        const { name, price, description } = req.body;
        const updateDate = {};
        if (name) updateDate.name = name;
        if (price) updateDate.price = price;
        if (description) updateDate.description = description;

        if (Object.keys(updateDate).length === 0) {
            return res.status(400).json({ error: "No fields to update" });
        }
        const result = await db.collection("products").updateOne(
            { _id: new ObjectId(id) },
            { $set: updateDate }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Product not found" });
        }
        return res.status(200).json({ message: "Product updated" });
    } catch (error) {
        console.error("Error PUT/products/:id:", error.message);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

// DELETE /products/:id - Удаление продукта по ID
app.delete("/products/:id", async (req, res) => {
    try {
        const db = getDB();
        if (!db) {
            return res.status(500).json({ error: "Database not connected" });
        }
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Неверный ID" });
        }

        const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Продукт не найден" });
        }

        res.status(200).json({ message: "Продукт удалён" });

    } catch (error) {
        console.error("Ошибка DELETE /products/:id:", error.message);
        res.status(500).json({ error: "Ошибка сервера", details: error.message });
    }
});

//   SERVER START
async function startServer() {
    try {
        const db = await connectToDB();
        if (!db) {
           console.error("Database connection failed");
           return;
        } 
    
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
    }
}
startServer();