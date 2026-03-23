import { Router } from "express";
import { getDb } from "../db/index.js";
import { authMiddleware } from "../db/middleware/authMiddleware.js";

const postsRouter = Router();
