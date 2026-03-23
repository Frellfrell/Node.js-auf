import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDb } from "../db/index.js";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  console.log("!!! ЗАПРОС НА РЕГИСТРАЦИЮ ПРИШЕЛ !!!", req.body);
  const { username, password } = req.body;

  // Валидация наличия полей
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const db = getDb();
    const hashedPassword = bcrypt.hashSync(password, 10);

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

authRouter.post("/login", async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default authRouter;
