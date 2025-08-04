import { Router } from "express";
const router = Router();
import { getUserList, searchUser } from "../controller/user.controller.js";
import { authMiddleware } from "../Middleware/auth.middleware.js";

router.get("/list", authMiddleware, getUserList);
router.get("/search", authMiddleware, searchUser);

export default router;