import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

// CREATE
router.post("/todos", async (req, res) => {
  try {
    const { title, text } = req.body;
    const todo = new Todo({ title, text });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при создании" });
  }
});

//  читаем
router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при получении" });
  }
});

// UPDATE
router.put("/todos/:id", async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при обновлении" });
  }
});

// DELETE  — удалить задачу
router.delete("/todos/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Удалено" });
  } catch (err) {
    res.status(500).json({ message: "Ошибка при удалении" });
  }
});

export default router;
