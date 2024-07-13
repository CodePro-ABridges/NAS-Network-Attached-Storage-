import {
  uploadFile,
  downloadFile,
  deleteFile,
  fetchFiles,
} from "../controllers/fileController";
import express from "express";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/upload", auth, uploadFile);
router.get("/", auth, fetchFiles);
router.get("/:id", auth, downloadFile);
router.delete("/:id", auth, deleteFile);

export default router;
