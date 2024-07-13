import express from "express";
import { register, login, fetchProfile } from "../controllers/userController";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", auth, fetchProfile);

export default router;
