import express from 'express';

// Создаем приложение Express
const app = express();

// Middleware для обработки JSON
app.use(express.json());

// Имитация БД
let products = [
  { id: 1, name: 'Product One', price: 29.99 },
  { id: 2, name: 'Product Two', price: 49.99 },
];

// GET /products — получить все товары
app.get('/products', (req, res) => {
  if (products.length > 0) {
    res.json(products);
  } else {
    res.status(404).json({ message: 'Products list is empty' });
  }
});

// GET /products/:id — получить товар по ID
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (!id) {
    return res.status(400).json({ message: 'ID must be a number' });
  }

  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
});

// POST /products — создать новый товар
app.post('/products', (req, res) => {
  const { name, price } = req.body;

  // Проверка на существование данных
  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required' });
  }

  // Проверка типов
  if (typeof name !== 'string') {
    return res.status(400).json({ message: 'Name must be a string' });
  }

  if (typeof price !== 'number') {
    return res.status(400).json({ message: 'Price must be a number' });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price,
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
