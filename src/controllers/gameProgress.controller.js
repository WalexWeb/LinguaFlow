import { Game } from "../models/game.model.js";
import { GameProgress } from "../models/gameProgress.model.js";
import { User } from "../models/user.model.js";

export const addResults = async (req, res) => {
  try {
    const { score, isCompleted } = req.body;

    const { id: gameId } = req.params;
    const userId = req.user.id;

    if (score == null || score < 0) {
      return res
        .status(400)
        .json({ message: "Некорректный или отсутствующий результат" });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: "Отсутствует указанная игра" });
    }

    // обновляем прогресс (upsert: true создаст новый, если нет)
    const progress = await GameProgress.findOneAndUpdate(
      { user: userId, gameId },
      {
        $max: { bestScore: score }, // сохраняем лучший результат
        $set: { isCompleted: isCompleted },
      },
      { upsert: true, new: true }
    );

    // обновим общий счёт пользователя (опционально)
    await User.findByIdAndUpdate(userId, { $inc: { score: score } });

    res.status(200).json(progress);
  } catch (error) {
    res.status(400).json({
      message: "Ошибка при получении данных",
      error: error.message,
    });
  }
};
