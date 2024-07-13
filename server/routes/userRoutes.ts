import express from "express";
import {
  register,
  login,
  fetchProfile,
} from "../controllers/userController.ts";
import auth from "../middleware/auth.ts";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", auth, fetchProfile);

export default router;
