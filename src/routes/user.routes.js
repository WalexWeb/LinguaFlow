import { Router } from "express";
import { authorize } from "../middleware/auth.middleware.js";
import {
  addAchievements,
  completeOnboarding,
  getUserProfile,
  updateUserProfile,
  updateUserScore,
} from "../controllers/user.controller.js";
import { checkOnboarding } from "../middleware/checkOnboarding.js";

const router = Router();

router.get("/profile", authorize, checkOnboarding, getUserProfile);

router.patch("/update", authorize, checkOnboarding, updateUserProfile);

router.put("/onboarding", authorize, completeOnboarding);

router.put("/update-score", authorize, updateUserScore);

router.patch("/achievements", authorize, addAchievements);

export const userRoutes = router;
