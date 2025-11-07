const http = require('http');
const fs = require('fs');


const PORT = 3000;
const server = http.createServer((req, res) => {
  try {
    // Специально вызываем ошибку
    throw new Error('Тестовая ошибка сервера');

  } catch (error) {
    // Логируем ошибку в файл errors.log
    const logMessage = `[${new Date().toISOString()}] ${error.message}\n`;
    fs.appendFile('errors.log', logMessage, (err) => {
      if (err) console.error('Ошибка при записи лога:', err);
    });

    // Отправляем ответ клиенту
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Internal Server Error');
  }
});

