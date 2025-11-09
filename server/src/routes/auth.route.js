import express from "express";
import {
  SignIn,
  SignUp,
  Logout,
  getCurrentUser,
} from "../controllers/auth.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

//authRoutes

router.post("/signin", SignIn);
router.post("/signup", SignUp);
router.post("/logout", Logout);

router.get("/me", protectRoute, getCurrentUser);

export default router;
