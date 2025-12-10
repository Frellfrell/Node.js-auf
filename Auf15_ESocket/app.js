import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import path from 'path';


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
    console.log('Новый пользователь подключен:', socket.id);

    // Обработка сообщения от клиента
    socket.on('chatMessage', (msg) => {
         console.log(`Message received - ${socket.id}: ${msg}`);
        // Отправка подтверждения клиенту
        socket.emit('message received', 'Сообщение получено!');
         // Отправка сообщения всем клиентам вместе с ID отправителя
        io.emit('chatMessage', msg, socket.id);
    });

    // Когда клиент отключается
    socket.on('disconnect', () => {
        console.log('Пользователь отключен:', socket.id);
    });
});

// Запуск сервера на порту 3000


server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});