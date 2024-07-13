import multer from "multer";
import path from "path";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void,
  ) => {
    cb(null, "uploads/");
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

//Upload single file
export const uploadSingleFile = upload.single("file");

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

export { upload };
