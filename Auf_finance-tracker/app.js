import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import balanceRoutes from "./routes/balanceRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api' , balanceRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log("Сервер запущен");
});
    
    