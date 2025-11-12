import express from "express";
import dotenv from "dotenv";
import db from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/products", async (_req, res) => {
    try {
      const [rows] = await db.promise().query("SELECT * FROM products");
         res.status(200).json(rows);
  } catch (error) {
    console.error("Ошибка при обработке GET/products:", error);
    res.status(500).json("внутренняя ошибка сервера");
  }
});

app.post("/products", async (req, res) => {
  try {
    const {name, price} = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: "Name and price are required" });
    }

    const sql = "INSERT INTO products (name, price) VALUES (?, ?)";
    const [result] = await db.promise().query(sql, [name, price]);

    res.status(201).json({
      message: "Данные успешно получены!",
      productId: result.insertId,
    });
  } catch (error) {
    console.error("Ошибка при обработке POST/products:", error);
    res.status(500).json({ error: "Произошла ошибка при выполнении POST/products" });
  }
});
// Обработка несуществующих маршрутов
app.use((_req, res) => {
  res.status(404).json({ error: "Маршрут не найден" });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});