import React, { useState } from "react";
import { useAppDispatch } from "../../../store/hooks.ts";
import { uploadFile, createFolder } from "../../../store/slices/fileSlice.ts";

const UploadForm: React.FC = () => {
  //State
  const [file, setFile] = useState<File | null>(null);
  const [folderName, setFolderName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");

  const dispatch = useAppDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      dispatch(uploadFile({ file, folderId: selectedFolder }));
    }
  };

  const handleCreateFolder = () => {
    if (folderName) {
      dispatch(createFolder(folderName));
      setFolderName("");
    }
  };

  return (
    <div className="mb-6">
      <input type="file" onChange={handleFileChange} className="mb-2" />
      <select
        value={selectedFolder}
        onChange={(e) => setSelectedFolder(e.target.value)}
        className="mb-2 ml-2"
      >
        <option value="">Root</option>
      </select>
      <button
        onClick={handleUpload}
        className="bg-green-500 text-white px-4 py-2 rounded ml-2"
      >
        Upload
      </button>
      <div className="mt-2">
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="New folder name"
          className="mr-2"
        />
        <button
          onClick={handleCreateFolder}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Folder
        </button>
      </div>
    </div>
  );
};

export default UploadForm;
