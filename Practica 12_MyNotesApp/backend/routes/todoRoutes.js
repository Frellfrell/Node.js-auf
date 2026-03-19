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

// DELETE /api/todos/:id — удалить задачу
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  let todos = readTodos();
  todos = todos.filter((t) => t.id !== id);
  writeTodos(todos);
  res.status(204).end();
});

export default router;
