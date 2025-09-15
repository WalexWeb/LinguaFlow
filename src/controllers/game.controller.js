import { Game } from "../models/game.model.js";

export const getGames = async (req, res) => {
  try {
    const games = await Game.find();

    if (!games) {
      return res.status(404).json({ message: "Отсутствуют доступные игры" });
    }

    res.status(200).json(games);
  } catch (error) {
    res.status(400).json({
      message: "Ошибка при получении данных",
      error: error.message,
    });
  }
};

export const addGame = async (req, res) => {
  try {
    const { title, description, category, difficulty, requiredLevel, link } =
      req.body;

    const existingGame = await Game.findOne({ title });
    if (existingGame) {
      return res.status(400).json({ message: "Такая игра уже существует" });
    }

    const newGame = await Game.create({
      title: title,
      description: description,
      category: category,
      difficulty: difficulty,
      requiredLevel: requiredLevel,
      link: link,
    });

    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({
      message: "Ошибка при создании игры",
      error: error.message,
    });
  }
};

export const updateGame = async (req, res) => {
  try {
    const { id } = req.params;

    const game = await Game.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!game) {
      return res.status(404).json({ message: "Отсутствует указанная игра" });
    }

    res.status(200).json(game);
  } catch (error) {
    res.status(400).json({
      message: "Ошибка при обновлении данных игры",
      error: error.message,
    });
  }
};

export const deleteGame = async (req, res) => {
  try {
    const { id } = req.params;

    const game = await Game.findByIdAndDelete(id);

    if (!game) {
      return res.status(404).json({ message: "Отсутствует указанная игра" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(400).json({
      message: "Ошибка при удалении игры",
      error: error.message,
    });
  }
};
