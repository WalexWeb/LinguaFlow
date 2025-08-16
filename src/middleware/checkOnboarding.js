import { User } from "../models/user.model.js";

export const checkOnboarding = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    if (!user.isOnboarded) {
      return res
        .status(403)
        .json({ message: "Пользователь не прошёл онбординг" });
    }

    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка проверки онбординга", error: error.message });
  }
};
