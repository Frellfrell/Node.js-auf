import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",        
  password: "root",        
  database: "product_db",
});

// Подключаемся и проверяем соединение
db.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к MySQL:", err);
    return;
  }
  console.log("Успешное подключение к базе данных MySQL");
});

export default db;
