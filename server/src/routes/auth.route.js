import express from "express";
import { SignIn, SignUp, Logout } from "../controllers/auth.controllers.js";

const router = express.Router();

//authRoutes

router.post("/signin", SignIn);
router.post("/signup", SignUp);
router.post("/logout", Logout);

export default router;
