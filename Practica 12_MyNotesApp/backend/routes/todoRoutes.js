import express from "express";
impport Todo from "../models/Todo.js";

const router = express.Router();



// CREATE
router.post('/todos', async (req, res) => {
  try {
    const { title, text } = req.body;
    const todo = new Todo({ title, text });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при создании' });
  }
});

//  читаем 
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении' });
  }
});


// UPDATE
router.put('/todos/:id', async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при обновлении' });
  }
});

// DELETE /api/todos/:id — удалить задачу
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при удалении' });
  }
});
  todos = todos.filter((t) => t.id !== id);
  writeTodos(todos);
  res.status(204).end();
});

export default router;
