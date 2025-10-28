
// Чат-приложение
/*1.Создайте новый файл с именем `chat_app.js`.
1.Импортируйте модуль `events` и создайте экземпляр `EventEmitter`.
1.Напишите функцию `sendMessage`, которая принимает имя пользователя, сообщение и объект `EventEmitter`.
1.Внутри функции `sendMessage` генерируйте событие `message` с именем пользователя и сообщением.
1.Зарегистрируйте обработчик для события `message`, чтобы выводить сообщение в формате "User: Message".
1.Вызовите функцию `sendMessage` несколько раз с разными пользователями и сообщениями.*/

const EventsEmitter = require('events');
const appEmtter = new EventsEmitter();

appEmtter.on('message', (user, message) => {
    console.log(`${user}: ${message}`);

});

function sendMessage(user,message, emitter) {
    emitter.emit('message', user, message);

};

sendMessage('Anna', 'Hello!', appEmtter);
sendMessage('Fedy', 'Hello Later', appEmtter);
sendMessage('Чарли', 'Как дела?', appEmtter);
sendMessage('Алиса', 'Отлично, спасибо!', appEmtter);