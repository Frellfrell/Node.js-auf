"use strict";

import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import sequelize from "../db"; // Импортируем sequelize из db.js

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development"; // Среда разработки
const config = require(__dirname + "/../config/config.json")[env]; // Конфигурация из config.json
const db = {};

let sequelizeInstance = sequelize;

fs.readdirSync(__dirname) // Читаем все файлы в текущей директории
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && // Исключаем скрытые файлы
      file !== basename && // Исключаем сам index.js
      file.slice(-3) === ".js" && // Берем только файлы с расширением .js
      file.indexOf(".test.js") === -1 // Исключаем тестовые файлы
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelizeInstance,
      Sequelize.DataTypes,
    ); // Загружаем модели
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // Связи между моделями
  }
});

db.sequelize = sequelizeInstance; // Экспортируем sequelize
db.Sequelize = Sequelize; // Экспортируем Sequelize

module.exports = db; // Экспортируем все модели
