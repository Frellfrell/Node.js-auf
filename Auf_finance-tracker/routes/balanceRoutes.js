import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post('/set-balance', async (req, res) => {
  try {
    const { initialBalance } = req.body;

    if (initialBalance === undefined) {
        return res.status(400).json({ message: 'Начальный баланс обязателен' });
    }

    if