import React from "react";
import { motion } from "framer-motion";
import { File } from "../../../types.ts";

interface FileListProps {
  files: File[] | null | undefined;
}

const FileList: React.FC<FileListProps> = ({ files }) => {
  console.log("Files prop in FileList: ", files);
  //
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transistion: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacitiy: 1 },
  };

  if (!files || files.length === 0) {
    return <p>No Files available</p>;
  }

  return (
    <motion.ul variants={listVariants} initial="hidden" animate="visible">
      {files.map((file) => (
        <motion.li
          key={file.id}
          variants={itemVariants}
          className="mb-2 p-2 bg-gray-100 rounded"
        >
          {file.name} - <button className="text-blue-500">Download</button>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default FileList;
