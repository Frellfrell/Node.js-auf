import { dotenv } from 'dotenv';
import express from 'express';
import bcrypt from 'bcrypt';
import { Sequelize, DataTypes } from 'sequelize';
import User from './models/user.js';

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Middleware авторизации
