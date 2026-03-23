import { Router } from "express";
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getDb } = require("../db");

const authRouter = Router();

authRouter.post("/register", async (_, res) => {
  const { username, password } = req.body;

  // Валидация наличия полей
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const existingUser = await db.collection("users").findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "Username already in use" });
  }

  const db = getDb();
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    await db
      .collection("users")
      .insertOne({ username, password: hashedPassword });
    // Возвращаем статус 201 и сообщение об успешной регистрации
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

authRouter.post("/login", async (_, res) => {
  const db = getDb();
  const { username, password } = req.body;

  const user = await db.collection("users").findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  res.status(200).json({ token });
});

export default authRouter;
