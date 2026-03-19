import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();
const DATA_FILE = "./data/todos.json";

//  читаем JSON
const readTodos = () => {
  try {
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
  } catch {
    return [];
  }
};

//  записываем JSON
const writeTodos = (todos) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
};

// GET /api/todos — список всех задач
router.get("/", (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

// POST /api/todos — добавить задачу
router.post("/", (req, res) => {
  const { title, text } = req.body;
  if (!title || !text)
    return res.status(400).json({ error: "Title and text required" });

  const todos = readTodos();
  const newTodo = { id: uuidv4(), title, text, complete: false };
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
});
