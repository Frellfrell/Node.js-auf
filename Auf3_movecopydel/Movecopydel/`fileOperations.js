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

// Переименование файла
fs.rename(sourceFilePath, renamedFilePath, (err) => {
  if (err) {
    return console.error('Ошибка при переименовании файла:', err);
  }
  console.log('Файл успешно переименован в renamedExample.jpg');

  // Копирование файла
  fs.copyFile(renamedFilePath, copyFilePath, (err) => {
    if (err) {
      return console.error('Ошибка при копировании файла:', err);
    }
    console.log('Файл успешно скопирован в copyOfExample.jpg');

    // Удаление оригинального файла
    fs.unlink(renamedFilePath, (err) => {
      if (err) {
        return console.error('Ошибка при удалении файла:', err);
      }
      console.log('Файл renamedExample.jpg успешно удален.');
    });
    });
});