import { Router } from "express";
import { getDb } from "../db/index.js";
import { authMiddleware } from "../db/middleware/authMiddleware.js";

const postsRouter = Router();

// Получение всех постов
postsRouter.get("/", async (_, res) => {
  const db = getDb();
  const posts = await db.collection("posts").find().toArray();
  res.json(posts);
});
