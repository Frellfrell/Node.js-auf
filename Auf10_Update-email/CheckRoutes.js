import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authMiddleware } from "./authMiddleware.js";


const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

const users = [
    {
        id: 1,
        email: "testuser@example.com",
        password: bcrypt.hashSync("12345", 10),
    }
];

// LOGIN — возвращает токен
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ error: "Email и пароль обязательны" });

    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({ error: "Неверные данные" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Неверные данные" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: { id: user.id, email: user.email } });
});

// PROTECTED маршрут
app.get("/me", authMiddleware, (req, res) => {
    res.json({ message: "Успешно!", user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));