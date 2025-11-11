import db from "./db.js";

const createTableQuery = `
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
)
`;

db.query(createTableQuery, (err, result) => {
  if (err) {
    console.error("Ошибка при создании таблицы:", err);
  } else {
    console.log("Таблица 'products' успешно создана (или уже существует)");
  }
  db.end();
});
