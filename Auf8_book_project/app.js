import Book  from "./models/book.js";
import express from "express";
import sequelize from "./config/db.js";
import { booksData } from "./models/sampleData.js";

const app = express();
app.use(express.json());

// Проверка подключения к базе
try {
  await sequelize.authenticate();
  console.log("DB connected!");
} catch (err) {
  console.error("DB connection error:", err);
}

// Загрузка тестовых данных при старте сервера
const existing = await Book.findAll();
if (existing.length === 0) {
  await Book.bulkCreate(booksData);
  console.log("Sample books inserted!");
}

//Получение всех книг
app.get("/books", async (_req, res) => {
  try { 
    const books = await Book.findAll();
    res.json(books);
  }  catch(error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
  
});

//Create a new book
app.post("/books", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    console.log("Received body:", req.body);
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Failed to create book" });
  }
});

//Update книги по ID
app.put("/books/:id", async (req, res) => {
    const id = req.params.id;
       await Book.update(req.body, { where: { id } });
       
            res.json({ message: "Book updated successfully" });
        });

        // DELETE — удалить книгу
app.delete("/books/:id", async (req, res) => {
  const id = req.params.id;
  await Book.destroy({ where: { id } });
  res.json({ message: "Deleted" });
});

//Запуск сервера
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});