import Book  from "./models/book.js";
import express from "express";
import sequelize from "./config/db.js";

const app = express();
app.use(express.json());

// Проверка подключения к базе
try {
  await sequelize.authenticate();
  console.log("DB connected!");
} catch (err) {
  console.error("DB connection error:", err);
}
//Получение всех книг
app.get("/books", async (_req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

//Create a new book
app.post("/books", async (req, res) => {
  try {
    const book = await Book.create(req.body);
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