import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function testMe() {
    try {
        const token = process.env.TOKEN;
        if (!token) throw new Error("Токен не найден в .env");

        const response = await axios.get("http://localhost:3000/me", {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Успешный запрос:");
        console.log(response.data);
    } catch (error) {
        if (error.response) {
            console.log("Статус:", error.response.status);
            console.log("Ответ:", error.response.data);
        } else {
            console.log("Ошибка:", error.message);
        }
    }
}

testMe();