import { Router } from "express";
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getDb } = require("../db");

const authRouter = Router();

authRouter.post("/register", async (_, res) => {
  const db = getDb();
  const { email, password } = req.body;
  const existingUser = db.collection("users").findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  await db.collection("users").insertOne({ email, password: hashedPassword });
  // Registration logic here
  res.status(201).json({ message: "User registered successfully" });
});

authRouter.post("/login", async (_, res) => {
  const db = getDb();
  const { email, password } = req.body;

  const user = await db.collection("users").findOne({ email });
  if (!user)
    return res.status(400).json({ message: "Invalid email or password" });

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid)
    return res.status(400).json({ message: "Invalid email or password" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(200).json({ token });
});

export default authRouter;
