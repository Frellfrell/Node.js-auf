import { dotenv } from 'dotenv';
import express from 'express';
import bcrypt from 'bcrypt';
import { Sequelize, DataTypes } from 'sequelize';
import User from './models/user.js';

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Middleware авторизации
const autMiddl = async (req, res, next) => {
  const userId = req.headers['user-id']; //  авторизация

  if (!userId)
    return res.status(401).json({ message: 'Вы не авторизованы' });

  const user = await User.findOne({ where: { id: userId } });

  if (!user)
    return res.status(401).json({ message: 'Пользователь не найден' });

  req.user = user;
  next();
};
// Middleware роли admin

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin')
    return res.status(403).json({ message: 'Доступ запрещён' });

  next();
};

// Middleware mustChangePassword
const mustChangePassword = (req, res, next) => {
  if (req.user.mustChangePassword)
    return res.status(403).json({ message: 'Нужно сменить пароль' });

  next();
};

// 1. Регистрация с проверкой email
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const exists = await User.findOne({ where: { email } });
  if (exists)
    return res.status(400).json({ message: 'Email уже зарегистрирован' });

  const hash = await bcrypt.hash(password, 10);

  await User.create({
    email,
    password: hash
  });

  res.json({ message: 'Регистрация успешна' });
});

// 2. Смена пароля
app.post('/change-password', autMiddl, async (req, res) => {
  const { newPassword } = req.body;

  const hash = await bcrypt.hash(newPassword, 10);

  await req.user.update({
    password: hash,
    mustChangePassword: false
  });

  res.json({ message: 'Пароль успешно изменён' });
});

// 3. Удаление аккаунта
app.post('/delete-account', auth, async (req, res) => {
  const { password } = req.body;

  const match = await bcrypt.compare(password, req.user.password);

  if (!match)
    return res.status(400).json({ message: 'Неверный пароль' });

  await req.user.destroy();

  res.json({ message: 'Аккаунт удалён' });
});

// 4. Админ
app.get('/admin', auth, mustChangePassword, isAdmin, (req, res) => {
  res.json({ message: 'Добро пожаловать в админ-панель!' });
});

// 5. Смена email
app.post('/change-email', auth, async (req, res) => {
  const { newEmail, password } = req.body;

  const match = await bcrypt.compare(password, req.user.password);

  if (!match)
    return res.status(400).json({ message: 'Пароль неверный' });

  const exists = await User.findOne({ where: { email: newEmail } });

  if (exists)
    return res.status(400).json({ message: 'Такой email уже существует' });

  await req.user.update({ email: newEmail });

  res.json({ message: 'Email изменён' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});