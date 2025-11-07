import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    try {
         res.status(200).send("Hello, World!");
  } catch (error) {
    console.error("Ошибка при обработке GET-запроса:", error);
    res.status(500).send("внутренняя ошибка сервера");
  }
});

app.post("/", (req, res) => {
  try {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: "Данные не были отправлены" });
    }

    res.status(200).json({
      message: "Данные успешно получены!",
      receivedData: data,
    });
  } catch (error) {
    console.error("Ошибка при обработке POST-запроса:", error);
    res.status(500).json({ error: "Произошла ошибка при выполнении POST-запроса" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});