import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.config.js";
import { User } from "../models/user.model.js";

export const authorize = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (!token && req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Пользователь не авторизован" });
    }

    // Проверяем токен
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Пользователь не авторизован", error: error.message });
    }

    // Добавляем пользователя в объект запроса для дальнейшего использования
    req.user = user;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized", error: error.message });
  }
};
