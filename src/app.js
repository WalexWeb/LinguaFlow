import express from "express";
import { PORT } from "./config/env.config.js";
import { authRouter } from "./routes/auth.routes.js";
import connectToDb from "./db/mongodb.js";
import { userRoutes } from "./routes/user.routes.js";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import { error } from "./middleware/error.middleware.js";
import { limiter } from "./middleware/rateLimit.middleware.js";
import cookieParser from "cookie-parser";
import { gamesRouter } from "./routes/game.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

// Защита от уязвимостей
app.use(helmet());

// Сжатие ответов для уменьшения размера передаваемых данных
app.use(compression());

app.use(cookieParser());

// Ограничение количества запросов
app.use(limiter);

// Обработка ошибок
app.use(error);

app.use("/api/auth", authRouter);
app.use("/api/user", userRoutes);
app.use("/api/games", gamesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  connectToDb();
});
