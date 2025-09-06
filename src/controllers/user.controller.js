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

export const updateUserScore = async (req, res) => {
  try {
    const { score } = req.body;

    // Получаем текущий счет пользователя
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    // Прибавляем новое значение к текущему счету
    user.score += score;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      message: "Ошибка при обновлении счета",
      error: error.message,
    });
  }
};

export const addAchievements = async (req, res) => {
  try {
    const { achievements } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { achievements: achievements } },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    // Проверяем, есть ли уже такое достижение
    if (user.achievements.includes(achievements)) {
      return res.status(400).json({ message: "Достижение уже добавлено" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      message: "Ошибка при добавлении достижения",
      error: error.message,
    });
  }
};
