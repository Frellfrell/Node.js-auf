const http = require('http');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // Получаем заголовок Authorization
  const authHeader = req.headers['authorization'];

   res.setHeader('Content-Type', 'text/plain');

  // Проверяем наличие заголовка Authorization
  if (!authHeader) {
    // Если нет — возвращаем 401 Unauthorized
    res.statusCode = 401;
    res.end('Unauthorized');
  } else {
    // Если есть — возвращаем 200 OK
    res.statusCode = 200;
    res.end('Authorization header received');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});