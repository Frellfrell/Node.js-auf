import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todosRouter from "./routes/todos.js";

dotenv.config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/todos", todosRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
