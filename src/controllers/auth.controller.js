import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.config.js";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким email уже существует" });
    }

    // Хешируем пароль
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Создаем нового пользователя
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      isOnboarded: false,
    });

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true, // Для защиты от XSS атак
        sameSite: "strict", // Для защиты от CSRF атак
        maxAge: 24 * 60 * 60 * 1000, // 1 день
      })
      .json({ user: newUser });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Неверный пароль" });
    }

    // Генерируем токен
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true, // Для защиты от XSS атак
        sameSite: "strict", // Для защиты от CSRF атак
        maxAge: 24 * 60 * 60 * 1000, // 1 день
      })
      .json({ user });
  } catch (error) {
    next(error);
  }
};
