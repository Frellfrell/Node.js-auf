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
