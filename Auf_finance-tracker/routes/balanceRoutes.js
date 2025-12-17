import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post('/set-balance', async (req, res) => {
  try {
    const { initialBalance } = req.body;

    if (initialBalance === undefined) {
        return res.status(400).json({ message: 'Начальный баланс обязателен' });
    }

    if (typeof initialBalance !== 'number') {
        return res.status(400).json({ message: 'Начальный баланс должен быть числом' });
    }

    if (initialBalance < 0) {
        return res.status(400).json({ message: 'Начальный баланс не может быть отрицательным' });
    }
    const user = new User({
      initialBalance,
      currentBalance: initialBalance,
      transactions: []
    });