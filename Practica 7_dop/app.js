import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
