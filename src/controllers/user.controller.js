import { User } from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    // Обновляем профиль пользователя
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
      // исключаем пароль из ответа для безопасности
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Ошибка обновления профиля", error: error.message });
  }
};

export const completeOnboarding = async (req, res) => {
  try {
    const { goals, languages, dailyMinutes } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        goals,
        languages,
        dailyMinutes,
        isOnboarded: true,
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      message: "Ошибка при сохранении онбординга",
      error: error.message,
    });
  }
};
