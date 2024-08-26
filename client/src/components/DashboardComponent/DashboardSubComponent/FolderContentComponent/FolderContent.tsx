import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { fetchFolderContents } from "../../../../store/slices/fileSlice.ts";
import { FaFolder, FaFile, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

interface FolderItem {
  id: string;
  name: string;
  type: "folder" | "file";
}

const FolderContent: React.FC = () => {
  //State
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { currentFolder, loading, error } = useAppSelector(
    (state) => state.file,
  );
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchFolderContents(id));
    }
  }, [id, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!currentFolder) return <div>Folder not found</div>;

  const handleItemClick = (item: FolderItem) => {
    if (item.type === "folder") {
      navigate(`/folder/${item.id}`);
    } else {
      //handle file click. Maybe download??
    }
  };

  const handleBarClick = () => {
    navigate(-1);
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <button onClick={handleBarClick} className="mr-2">
          <FaArrowLeft />
        </button>
        <h1 className="text-2xl font-bold">{currentFolder.name}</h1>
      </div>
      <motion.ul
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {currentFolder.contents.map((item: FolderItem) => (
          <motion.li
            key={item.id}
            variants={itemVariants}
            className="flex flex-col items-center p-4 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition-colors duration-200"
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => handleItemClick(item)}
          >
            {item.type === "folder" ? (
              hoveredItem === item.id ? (
                <FaFolder size={48} className="text-yellow-500 mb-2" />
              ) : (
                <FaFolder size={48} className="text-yellow-500 mb-2" />
              )
            ) : (
              <FaFile size={48} className="text-blue-500 mb-2" />
            )}
            <span className="text-center break-words w-full">{item.name}</span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default FolderContent;
