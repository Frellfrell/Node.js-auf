
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

let db = null;

export async function connectToDB() {
    const uri = process.env.MONGO_URI;

    if (!uri) {
        console.error("Ошибка: MONGO_URI отсутствует в .env");
        process.exit(1);
    }

    try {
        const client = new MongoClient(uri);
        await client.connect();

        db = client.db();
        console.log("Успешное подключение к MongoDB");

        return db;
    } catch (error) {
        console.error("Ошибка подключения:", error.message);
        process.exit(1);
    }
}

export function getDB() {
    if (!db) {
        console.error("Ошибка: база данных ещё не подключена");
        return null;
    }
    return db;
}