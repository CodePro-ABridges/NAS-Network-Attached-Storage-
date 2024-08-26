import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Folder } from "../../../types.ts";

interface FolderListProps {
  folders: Folder[];
}

const FolderList: React.FC<FolderListProps> = ({ folders }) => {
  //State
  const [hoveredFolder, setHoveredFolder] = useState<string | null>(null);
  const navigate = useNavigate();
  //
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  //DoubleClick function for nested structure.
  const handleDoubleClick = (folderId: string) => {
    navigate(`/folder/${folderId}`);
  };

  return (
    <motion.ul
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {folders.map((folder) => (
        <motion.li
          key={folder.id}
          variants={itemVariants}
          className="flex flex-col items-center p-4 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition-colors duration-200"
          onMouseEnter={() => setHoveredFolder(folder.id)}
          onMouseLeave={() => setHoveredFolder(null)}
          onDoubleClick={() => handleDoubleClick(folder.id)}
        >
          {hoveredFolder === folder.id ? (
            <FaFolderOpen size={48} className="text-yellow-500 mb-2" />
          ) : (
            <FaFolder size={48} className="text-yellow-500 mb-2" />
          )}
          <span className="text-center break-words w-full">{folder.name}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default FolderList;
