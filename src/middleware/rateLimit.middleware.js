import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 30, // максимум запросов с одного IP за 15 минут
  message: "Слишком много запросов с вашего IP, попробуйте позже",
});
