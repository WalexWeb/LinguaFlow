import { Router } from "express";
import { authorize } from "../middleware/auth.middleware.js";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/profile", authorize, getUserProfile);

router.put("/update", authorize, updateUserProfile);

export const userRoutes = router;
