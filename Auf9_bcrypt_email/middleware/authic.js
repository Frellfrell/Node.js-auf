import User from '../models/user.js';
//Проверка авторизации через userId в заголовке
export const authMiddleware = async (req, res, next) => {
    const userId = req.headers['user-id'];
  if (!userId) { 
    return res.status(401).json({ message: 'Нет авторизации' });
  }
     

  const user = await User.findOne({ where: { id: userId } });

  if (!user) {
    return res.status(401).json({ message: 'Пользователь не найден' });
  }
     

  req.user = user;
  next();
};

//Проверка mustChangePassword
export const mustChangePasswordMiddleware = (req, res, next) => {
  if (req.user.mustChangePassword) {
    return res.status(403).json({ message: 'Необходимо сменить пароль' });
  }
  next();
};

// Проверка роли admin
export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Доступ запрещен' });
  }
  next();
};