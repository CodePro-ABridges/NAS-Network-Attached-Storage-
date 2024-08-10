import React from "react";
import { motion } from "framer-motion";
import { Folder } from "../../../types.ts";

interface FolderListProps {
  folders: Folder[];
}

const FolderList: React.FC<FolderListProps> = ({ folders }) => {
  //
  const listVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.ul variants={listVariants} initial="hidden" animate="visible">
      {folders.map((folder) => (
        <motion.li
          key={folder.id}
          variants={itemVariants}
          className="mb-2 p-2 bg-gray-100 rounded"
        >
          {folder.name} - <button className="text-blue-500">Download</button>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default FolderList;
