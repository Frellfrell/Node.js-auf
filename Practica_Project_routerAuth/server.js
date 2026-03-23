import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./db/index.js";
import authRouter from "./routes/auth.js";
import postsRouter from "./routes/posts.js";

dotenv.config();

const app = express();
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3333;
app.use(express.json());
app.use("/auth", authRouter);
app.use("/posts", postsRouter);

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at ${HOST}:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error starting the server:", error);
  });
