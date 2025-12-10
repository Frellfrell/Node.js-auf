import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';


dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

const PORT = process.env.PORT || 3000;

// Отдаём статические файлы из папки public
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.json());

// маршрут для проверки сервера
app.get('/info', (_req, res) => {
    res.send('Server is running');
});

//Когда клиент подключается

io.on('connection', (socket) => {
    console.log('Новый пользователь подключен');

    // Обработка сообщения от клиента
    socket.on('chat message', (msg) => {
        console.log('Сообщение от клиента: ' + msg);

        // Отправка подтверждения клиенту
        socket.emit('message received', 'Сообщение получено!');
    });

    // Когда клиент отключается
    socket.on('disconnect', () => {
        console.log('Пользователь отключен');
    });
});

// Запуск сервера на порту 3000


server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});