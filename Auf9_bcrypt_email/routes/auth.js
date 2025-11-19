import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';


const router = express.Router();

// Регистрация
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email уже зарегистрирован' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    res.status(201).json({ message: 'Пользователь зарегистрирован', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Смена пароля
router.post('/change-password', authMiddleware, async (req, res) => {
  const { newPassword } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await req.user.update({ password: hashedPassword, mustChangePassword: false });
    res.json({ message: 'Пароль успешно изменен' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Удаление аккаунта
router.post('/delete-account', authMiddleware, async (req, res) => {
  const { password } = req.body;
  try {
    const isMatch = await bcrypt.compare(password, req.user.password);
    if (!isMatch) return res.status(400).json({ message: 'Неверный пароль' });

    await req.user.destroy();
    res.json({ message: 'Аккаунт удален' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Доступ для админов
router.get('/admin', authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: 'Добро пожаловать, администратор!' });
});

// Смена email
router.post('/change-email', authMiddleware, async (req, res) => {
  const { newEmail, password } = req.body;
  try {
    const isMatch = await bcrypt.compare(password, req.user.password);
    if (!isMatch) return res.status(400).json({ message: 'Неверный пароль' });

    const existingUser = await User.findOne({ where: { email: newEmail } });
    if (existingUser) return res.status(400).json({ message: 'Email уже используется' });

    await req.user.update({ email: newEmail });
    res.json({ message: 'Email успешно изменен' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;