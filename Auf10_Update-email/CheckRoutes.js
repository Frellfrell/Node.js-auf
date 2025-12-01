import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticateJWT from "./Middleware/authenticateJWT.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
if (!JWT_SECRET) {
    console.error(" Ошибка: нет JWT_SECRET в .env");
    process.exit(1);
}

const users = [
    {
        id: 1,
        email: "testuser@example.com",
        password: bcrypt.hashSync("12345", 10),
        role: "admin"
    },
    {
        id: 2,
        email: "user2@example.com",
        password: bcrypt.hashSync("12345", 10),
        role: "user"
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

    const token = jwt.sign(
        { id: user.id,
             email: user.email
             },
              JWT_SECRET,
               { expiresIn: "1h" });
    res.json({ token });
});

// PROTECTED маршрут
app.get("/me", authenticateJWT, (req, res) => {
    res.json({ message: "Успешно!", user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

// DELETE ACCOUNT
app.delete("/delete-account", authenticateJWT, (req, res) => {
    try {
        const userId = req.user.id;

        const userExists = users.find(u => u.id === userId);
        if (!userExists) return res.status(404).json({ error: "Пользователь не найден" });

        // Удаляем пользователя из массива
        users = users.filter(u => u.id !== userId);

        res.json({ message: "Аккаунт успешно удалён" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка при удалении аккаунта" });
    }
});




