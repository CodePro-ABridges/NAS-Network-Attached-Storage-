import React from "react";
import { FaFileAlt, FaFileUpload, FaFolderPlus } from "react-icons/fa";

const SubBar = ({ setIsCreateFolderModalOpen }) => {
  return (
    <nav className="flex justify-between items-center mt-2 bg-white py-2 px-5">
      <p>root / </p>
      <ul className="flex">
        <li className="mx-2">
          <button className="flex items-center border border-gray-400 text-gray-600 py-1 px-2 rounded hover:bg-gray-100">
            <FaFileUpload className="mr-2" /> Upload File
          </button>
        </li>
        <li className="mx-2">
          <button className="flex items-center border border-gray-400 text-gray-600 py-1 px-2 rounded hover:bg-gray-100">
            <FaFileAlt className="mr-2" /> Create File
          </button>
        </li>
        <li className="mx-2">
          <button
            className="flex items-center border border-gray-400 text-gray-600 py-1 px-2 rounded hover:bg-gray-100"
            onClick={() => setIsCreateFolderModalOpen(true)}
          >
            <FaFolderPlus className="mr-2" /> Create Folder
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default SubBar;
