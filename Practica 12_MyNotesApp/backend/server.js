import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/todoRoutes.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Подключение к MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(" MongoDB подключена"))
  .catch((err) => console.error(" Ошибка MongoDB:", err));

app.use(cors());
app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
