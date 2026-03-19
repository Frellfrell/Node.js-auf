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
