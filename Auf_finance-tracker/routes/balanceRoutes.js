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

//Маршрут для пополнения баланса пользователя
router.post('/add-balance', async (req, res) => {
  try {
    const { userId, amount } = req.body;

    // Проверка корректности суммы
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: 'Сумма должна быть положительным числом' });
    }

    // Поиск пользователя по ID
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

    // Обновление баланса и добавление транзакции
    user.currentBalance += amount;
    user.transactions.push({
         type: 'income',
          amount,
        date: new Date()
    });

    // Сохранение изменений
    await user.save();

    // Ответ с подтверждением и обновленными данными пользователя
    res.json({ message: 'Баланс пополнен', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/add-expense', async (req, res) => {
    try {
        const { userId, amount } = req.body;
        // Проверка корректности суммы
        if (!amount || typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ message: 'Сумма должна быть положительным числом' });
        }
        // Поиск пользователя по ID
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
        // Проверка достаточности средств
        if (user.currentBalance < amount) {
            return res.status(400).json({ message: 'Недостаточно средств на балансе' });
        }
        // Обновление баланса и добавление транзакции
        user.currentBalance -= amount;
        user.transactions.push({
            type: 'expense',
            amount,
            date: new Date()
        });
        // Сохранение изменений
        await user.save();
        // Ответ с подтверждением и обновленными данными пользователя
        res.json({ message: 'Расход добавлен', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
