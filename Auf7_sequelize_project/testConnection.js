const sequelize = require('./config/db.js');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Подключение к базе данных успешно!');
  } catch (error) {
    console.error('Ошибка подключения:', error);
  } finally {
    await sequelize.close();
  }
})();
