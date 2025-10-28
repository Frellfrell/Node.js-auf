const fs = require('fs');

// Создаём и записываем текст в файл info.txt
fs.writeFile('info.txt', 'Node.js is awesome!', (err) => {
  if (err) {
    console.error('Ошибка при записи файла:', err);
  } else {
    console.log('Файл "info.txt" успешно создан и записан.');

     // После записи читаем содержимое файла
    fs.readFile('info.txt', 'utf8', (err, data) => {
      if (err) {
        console.error('Ошибка при чтении файла:', err);
      } else {
        console.log('Содержимое файла:');
        console.log(data);
      }
    });
  }
});
