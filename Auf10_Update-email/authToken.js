import axios from "axios";

async function getToken() {
    try {
        const response = await axios.post("http://localhost:3000/login", {
            email: "testuser@example.com",
            password: "12345",
        });

        const token = response.data.TOKEN;
        console.log("Скопируй токен в  .env:");
        console.log(token);
    } catch (error) {
        console.error("Ошибка при получении токена:");
        console.log(error.response?.data || error.message);
    }
}

getToken();