import mongoose, { Document, Schema, model } from "mongoose";

export interface IFolder extends Document {
  name: string;
  owner: mongoose.Types.ObjectId;
  parent: mongoose.Types.ObjectId | null;
  files: { _id: mongoose.Types.ObjectId; filename: string }[];
  subfolders: IFolder[];
  sharedWith: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const folderSchema = new Schema<IFolder>(
  {
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    parent: { type: Schema.Types.ObjectId, ref: "Folder", default: null },
    files: [{ type: Schema.Types.ObjectId, ref: "File" }],
    subfolders: [{ type: Schema.Types.ObjectId, ref: "Folder" }],
    sharedWith: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

export default model<IFolder>("Folder", folderSchema);
