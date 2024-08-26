import mongoose from "mongoose";
import { Request, Response } from "express";
import { Folder, File } from "../schemas/index.ts";
import { IFolder } from "../schemas/folderSchema.ts";

//Create new folder
export const createFolder = async (req: Request, res: Response) => {
  try {
    const { name, parentId } = req.body;
    const newFolder = new Folder({
      name,
      owner: req.user?.userId,
      parent: parentId || null,
    });

    await newFolder.save();

    if (parentId) {
      await Folder.findByIdAndUpdate(parentId, {
        $push: { subfolders: newFolder._id },
      });
    }

    res
      .status(201)
      .json({ message: "Folder created successfully", folder: newFolder });
  } catch (err) {
    console.error("Error creating folder: ", err);
    res.status(500).json({ message: "Error creating folder" });
  }
};

//fetch ALL folders for user
export const fetchFolders = async (req: Request, res: Response) => {
  try {
    const folders = await Folder.find({ owner: req.user?.userId });
    res.json(folders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching folders" });
  }
};

//fetch ONE folder for user
export const fetchFolder = async (req: Request, res: Response) => {
  try {
    const folder = await Folder.findOne({
      _id: req.params.id,
      owner: req.user?.userId,
    })
      .populate("files")
      .populate("subfolders");

    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    res.json(folder);
  } catch (err) {
    res.status(500).json({ message: "Error fetching folder" });
  }
};

//fetch folder contents
export const fetchFolderContents = async (req: Request, res: Response) => {
  try {
    const folderId = req.params.id;
    const userId = req.user?.userId;

    //
    const folder = await Folder.findOne({ _id: folderId, owner: userId })
      .populate<{
        files: { _id: mongoose.Types.ObjectId; filename: string }[];
      }>("files")
      .populate<{ subfolders: IFolder[] }>("subfolders");

    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    const folderContents = {
      id: folder._id,
      name: folder.name,
      contents: [
        ...folder.subfolders.map((subfolder) => ({
          id: subfolder._id,
          name: subfolder.name,
          type: "folder" as const,
        })),
        ...folder.files.map((file) => ({
          id: file._id,
          name: file.filename,
          type: "file" as const,
        })),
      ],
    };

    res.json(folderContents);
  } catch (err) {
    console.error("Error fetching folder contents: ", err);
    res.status(500).json({ message: "Error fetching folder contents" });
  }
};

//update a folder
export const updateFolder = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const folder = await Folder.findByIdAndUpdate(
      {
        _id: req.params.id,
        owner: req.user?.userId,
      },
      { name },
      { new: true },
    );

    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    res.json({ message: "Folder updated succesfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating folder" });
  }
};

//Delete a folder
export const deleteFolder = async (req: Request, res: Response) => {
  try {
    const folder = await Folder.findOne({
      _id: req.params.id,
      owner: req.user?.userId,
    });

    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    console.log("FolderController folder._id: ", folder._id);
    //Using recursion to delete the folders and files within parent folder.
    // await recursiveDelete(folder._id); //ERROR LINE

    res.json({ message: "Folder and contents deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting folder" });
  }
};

//Recursive function to delete
async function recursiveDelete(folderId: mongoose.Types.ObjectId | string) {
  try {
    const folder = await Folder.findById(folderId);
    if (!folder) {
      console.log(`Folder not found: ${folderId}`);
      return;
    }
    try {
      await File.deleteMany({ _id: { $in: folder.files } });
    } catch (err) {
      console.error(`Error deleting files in folder ${folderId}: `, err);
    }

    for (let subfolderId of folder.subfolders) {
      if (
        typeof subfolderId === "string" ||
        subfolderId instanceof mongoose.Types.ObjectId
      ) {
        await recursiveDelete(subfolderId);
      } else {
        console.error(`Invalid subfolderId type: ${typeof subfolderId}`);
      }
    }
    await Folder.findByIdAndDelete(folderId);
    console.log(`Folder deleted successfully: ${folderId}`);
  } catch (err) {
    console.error(`Error in recursive delete for folder ${folderId}: `, err);
    throw err;
  }
}
