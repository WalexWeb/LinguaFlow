import express from "express";
import rateLimit from "express-rate-limit";
import { PORT } from "./config/env.config.js";
import { authRouter } from "./routes/auth.routes.js";
import connectToDb from "./db/mongodb.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Ограничение количества запросов
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 10, // максимум 10 запросов с одного IP за 15 минут
  message: "Слишком много запросов с вашего IP, попробуйте позже",
});

app.use(limiter);

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  connectToDb();
});
