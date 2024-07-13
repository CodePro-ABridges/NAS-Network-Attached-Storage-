import { Request, Response } from "express";
import { uploadSingleFile } from "../middleware/fileMiddleware";
import { File } from "../schemas";
import fs from "node:fs/promises";
import multer from "multer";

//Upload
export const uploadFile = async (req: Request, res: Response) => {
  uploadSingleFile(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: "Multer error", error: err });
    } else if (err) {
      return res.status(500).json({ message: "Unknown error", error: err });
    }

    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const newFile = new File({
        filename: req.file.filename,
        originalName: req.file.originalname,
        path: req.file.path,
        size: req.file.size,
        mimetype: req.file.mimetype,
        owner: req.user?.userId,
      });

      await newFile.save();
      res
        .status(201)
        .json({ message: "File uploaded successfully", file: newFile });
    } catch (err) {
      console.error("Error uploading file: ", err);
      res.status(500).json({ message: "Error uploading file" });
    }
  });
};

//Download File
export const downloadFile = async (req: Request, res: Response) => {
  try {
    const file = await File.findOne({
      _id: req.params.id,
      owner: req.user?.userId,
    });
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    const fileContent = await fs.readFile(file.path);
    res.contentType(file.mimetype);
    res.send(fileContent);
  } catch (err) {
    console.error("Error downloading file: ", err);
    res.status(500).json({ message: "Error downloading file" });
  }
};

//fetch all files
export const fetchFiles = async (req: Request, res: Response) => {
  try {
    const files = await File.find({ owner: req.user?.userId });
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: "Error fetching files" });
  }
};

//Delete File
export const deleteFile = async (req: Request, res: Response) => {
  try {
    const file = await File.findOneAndDelete({
      _id: req.params.id,
      owner: req.user?.userId,
    });
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    //Remove path from file system
    await fs.unlink(file.path);
    res.json({ message: "File deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting file" });
  }
};
