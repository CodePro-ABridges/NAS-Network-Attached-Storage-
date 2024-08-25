import express from "express";
import {
  createFolder,
  fetchFolders,
  fetchFolder,
  updateFolder,
  deleteFolder,
} from "../controllers/folderController.ts";
import auth from "../middleware/auth.ts";

const router = express.Router();

router.post("/", auth, createFolder);
router.get("/", auth, fetchFolders);
router.get("/:id", auth, fetchFolder);
router.put("/:id", auth, updateFolder);
router.delete("/:id", auth, deleteFolder);

export default router;
