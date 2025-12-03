import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import testRoutes from './routes/test.js';

dotenv.config();

const app = express();
app.use(express.json());
//Используем роуты для тестирования
app.use('/api', testRoutes);

const mongoUri = process.env.MONGO_URI || '';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

connectDB();

export default app;