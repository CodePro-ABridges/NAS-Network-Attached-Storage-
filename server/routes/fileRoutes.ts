import {
  uploadFile,
  downloadFile,
  deleteFile,
  fetchFiles,
} from "../controllers/fileController.ts";
import express from "express";
import auth from "../middleware/auth.ts";

const router = express.Router();

router.post("/upload", auth, uploadFile);
router.get("/", auth, fetchFiles);
router.get("/:id", auth, downloadFile);
router.delete("/:id", auth, deleteFile);

export default router;
