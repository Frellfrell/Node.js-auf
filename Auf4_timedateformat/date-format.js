const moment = require('moment');

const now = moment();

console.log("Обычный формат:", now.format());


console.log("Читаемый формат (YYYY-MM-DD HH:mm:ss):", now.format('YYYY-MM-DD HH:mm:ss'));
console.log("Читаемый формат (DD/MM/YYYY):", now.format('DD/MM/YYYY'));// День-месяц-год
console.log("Читаемый формат (MMMM Do YYYY, h:mm:ss a):", now.format('MMMM Do YYYY, h:mm:ss a')); // Месяц , день с суффиксом, год
