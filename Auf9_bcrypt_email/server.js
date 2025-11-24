import dotenv from 'dotenv';
import express from 'express';
import bcrypt from 'bcrypt';
import User from './models/user.js';

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

//Тест

app.get('/', (_req, res) => {
  res.send(`
    <h1>Сервер работает</h1>
    <p>POST /register — регистрация</p>
    <p>GET /users — посмотреть список пользователей</p>
  `);
});

// ПОКАЗ ПОЛЬЗОВАТЕЛЕЙ (без паролей)
app.get('/users', async (_req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'role', 'mustChangePassword']
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Middleware авторизации
const autMiddleware = async (req, res, next) => {
  try { 
  const userId = req.headers['user-id']; //  авторизация

  if (!userId)
    return res.status(401).json({ message: 'Вы не авторизованы' });

  const user = await User.findOne({ where: { id: userId } });

  if (!user)
    return res.status(401).json({ message: 'Пользователь не найден' });

  req.user = user;
  next();
  } catch (error) {
    res.status(500).json({massage: 'Error registration'});
  }
  
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
  try { 
  const { email, password } = req.body;
   if (!email || !password)
      return res.status(400).json({ message: 'Email и пароль обязательны' });

    if (password.length < 4)
      return res.status(400).json({ message: 'Пароль должен быть не менее 4 символов' });

  const exists = await User.findOne({ where: { email } });
  if (exists)
    return res.status(400).json({ message: 'Email уже зарегистрирован' });

  const hash = await bcrypt.hash(password, 10);

  await User.create({
    email,
    password: hash
  });

  res.json({ message: 'Регистрация успешна' });
  } catch (err){
     res.status(500).json({ message: 'Ошибка сервера при регистрации' });
  
  }
});

// 2. Смена пароля
app.post('/change-password', autMiddleware, async (req, res) => {
  try { 
  const { newPassword } = req.body;
  if (!newPassword)
      return res.status(400).json({ message: 'Новый пароль обязателен' });

    if (newPassword.length < 4)
      return res.status(400).json({ message: 'Пароль должен быть не менее 4 символов' });

  const hash = await bcrypt.hash(newPassword, 15);

  await req.user.update({
    password: hash,
    mustChangePassword: false
  });

  res.json({ message: 'Пароль успешно изменён' });
  } catch (err) {
     res.status(500).json({ message: 'Ошибка сервера при смене пароля' })
  }
});

// 3. Удаление аккаунта
app.post('/delete-account', autMiddleware, async (req, res) => {
  try { 
  const { password } = req.body;
  
  if (!password)
      return res.status(400).json({ message: 'Пароль обязателен' });

  const match = await bcrypt.compare(password, req.user.password);

  if (!match)
    return res.status(400).json({ message: 'Неверный пароль' });

  await req.user.destroy();

  res.json({ message: 'Аккаунт удалён' });
   } catch (err) {
 res.status(500).json({ message: 'Ошибка сервера при удалении аккаунта' });
   }
});

// 4. Админ
app.get('/admin', autMiddleware, mustChangePassword, isAdmin, (_req, res) => {
  res.json({ message: 'Добро пожаловать в админ-панель!' });
});

// 5. Смена email
app.post('/change-email', autMiddleware, async (req, res) => {
  try { 
  const { newEmail, password } = req.body;

  const match = await bcrypt.compare(password, req.user.password);

  if (!match)
    return res.status(400).json({ message: 'Пароль неверный' });

  const exists = await User.findOne({ where: { email: newEmail } });

  if (exists)
    return res.status(400).json({ message: 'Такой email уже существует' });

  await req.user.update({ email: newEmail });

  res.json({ message: 'Email изменён' });
  } catch (err) {
     res.status(500).json({ message: 'Ошибка сервера при смене email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});