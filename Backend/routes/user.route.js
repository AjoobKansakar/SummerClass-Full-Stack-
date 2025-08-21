import { Router } from "express";
const router = Router();

import {
  getUserList,
  searchUser,
  updateUserProfile,
} from "../controller/user.controller.js";
import { authMiddleware } from "../Middleware/auth.middleware.js";

router.get("/list", authMiddleware, getUserList);
router.get("/search", authMiddleware, searchUser);

router.put("/profile", authMiddleware, updateUserProfile);

export default router;