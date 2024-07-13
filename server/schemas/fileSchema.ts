import mongoose, { Document, Schema, model } from "mongoose";

export interface IFile extends Document {
  filename: string;
  path: string;
  size: number;
  mimetype: string;
  owner: mongoose.Types.ObjectId;
  sharedWith: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const fileSchema = new Schema<File>(
  {
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
    mimetype: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sharedWith: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

export default model<IFile>("File", fileSchema);
