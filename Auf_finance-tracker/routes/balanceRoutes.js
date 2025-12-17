import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Установка-маршрут начального баланса пользователя
router.post('/set-balance', async (req, res) => {
  try {
    const { initialBalance } = req.body;

    if (initialBalance === undefined) {
        return res.status(400).json({ message: 'Начальный баланс обязателен' });
    }

    if (typeof initialBalance !== 'number') {
        return res.status(400).json({ message: 'Начальный баланс должен быть числом' });
    }

    if (initialBalance < 0) {
        return res.status(400).json({ message: 'Начальный баланс не может быть отрицательным' });
    }
    // Создание нового пользователя с указанным начальным балансом
    const user = new User({
      initialBalance,
      currentBalance: initialBalance,
      transactions: []
    });
    // Сохранение пользователя в базе данных
     await user.save();

     // Ответ с подтверждением и данными пользователя
    res.status(201).json({
      message: 'Пользователь создан',
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

