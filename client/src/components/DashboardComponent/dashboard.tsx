import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FileList from "./DashboardSubComponent/FileList.tsx";
import FolderList from "./DashboardSubComponent/FolderList.tsx";
import UploadForm from "./DashboardSubComponent/UploadForm.tsx";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { fetchFiles, fetchFolders } from "../../store/slices/fileSlice.ts";

const Dashboard: React.FC = () => {
  //state
  const [activeTab, setActiveTab] = useState<"files" | "folders">("files");

  const dispatch = useAppDispatch();
  const { files, folders, loading } = useAppSelector((state) => {
    console.log("Current file state: ", state.file);
    return state.file;
  });

  useEffect(() => {
    console.log("Dispatching fetchFiles");
    dispatch(fetchFiles());
    dispatch(fetchFolders());
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="container mx-auto p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <UploadForm />
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${activeTab === "files" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("files")}
        >
          Files
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "folders" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("folders")}
        >
          Folders
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {activeTab === "files" && <FileList files={files} />}
          {activeTab === "folders" && <FolderList folders={folders} />}
        </>
      )}
    </motion.div>
  );
};

export default Dashboard;
