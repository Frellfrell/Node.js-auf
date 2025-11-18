import Book  from "./models/book.js";
//Получение всех книг
app.get("/books", async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
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