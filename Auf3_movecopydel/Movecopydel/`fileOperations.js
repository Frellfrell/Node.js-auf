const fs = require('fs');
const path = require('path');

// Определяем пути к файлам
const sourceFilePath = path.join(__dirname, 'example.jpg'); // исходный файл
const renamedFilePath = path.join(__dirname, 'renamedExample.jpg'); // после переименования
const copyFilePath = path.join(__dirname, 'copyOfExample.jpg'); // после копирования


//  Проверим, существует ли исходный файл
if (!fs.existsSync(sourceFilePath)) {
  console.error('Файл example.jpg не найден в текущей директории!');
  process.exit(1);
}