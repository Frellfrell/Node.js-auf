import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';
