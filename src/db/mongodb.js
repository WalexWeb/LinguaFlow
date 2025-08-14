import mongoose from "mongoose";
import { DB_URI } from "../config/env.config.js";

if (!DB_URI) {
  throw new Error("DB_URI не найден в переменных окружения");
}

const connectToDb = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Подключение к базе данных успешно");
  } catch (error) {
    console.error("Ошибка подключения к базе данных:", error);
    process.exit(1);
  }
};

export default connectToDb;
