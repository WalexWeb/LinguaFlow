import { Router } from "express";
import { authorize } from "../middleware/auth.middleware.js";
import {
  completeOnboarding,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { checkOnboarding } from "../middleware/checkOnboarding.js";

const router = Router();

router.get("/profile", authorize, checkOnboarding, getUserProfile);

router.put("/update", authorize, checkOnboarding, updateUserProfile);

router.put("/onboarding", authorize, completeOnboarding);

export const userRoutes = router;
