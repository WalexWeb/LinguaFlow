import { Router } from "express";
import { authorize } from "../middleware/auth.middleware.js";
import {
  addGame,
  deleteGame,
  getGames,
  updateGame,
} from "../controllers/game.controller.js";
import { addResults } from "../controllers/gameProgress.controller.js";

const router = new Router();

// Работа с играми
router.get("/all", authorize, getGames);

router.post("/create", authorize, addGame);

router.patch("/:id", updateGame);

router.delete("/:id", deleteGame);

// Обновление результатов игры у пользователя
router.get("/results/:id", authorize);

router.patch("/results/:id", authorize, addResults);

export const gamesRouter = router;
