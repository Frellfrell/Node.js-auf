import express from 'express';  
import mongoose from 'mongoose'; 
import dotenv from 'dotenv'; 
import Category from './models/Category.js'; 
import Product from './models/Product.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));


// Маршрут для добавления категорий
app.post('/categories', async (req, res) => {
    try {
        const category = new Category({ name: req.body.name });
        await category.save();
        res.status(201).send(category);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Маршрут для добавления продукции 




  app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});  