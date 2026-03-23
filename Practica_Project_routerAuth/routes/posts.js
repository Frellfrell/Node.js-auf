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

// Создание поста
postsRouter.post("/", authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const db = getDb();

  const newPost = {
    title,
    content,
    author: req.user.username,
    createdAt: new Date(),
  };

  await db.collection("posts").insertOne(newPost);
  res.status(201).json({ message: "Пост добавлен", post: newPost });
});
