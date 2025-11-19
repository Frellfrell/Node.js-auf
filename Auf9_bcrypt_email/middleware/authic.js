import User from '../models/user.js';
//Проверка авторизации через userId в заголовке
export const authMiddleware = async (req, res, next) => {
    const userId = req.headers['user-id'];
  if (!userId)
     return res.status(401).json({ message: 'Нет авторизации' });

  const user = await User.findOne({ where: { id: userId } });

  if (!user)
     return res.status(401).json({ message: 'Пользователь не найден' });

  req.user = user;
  next();
};