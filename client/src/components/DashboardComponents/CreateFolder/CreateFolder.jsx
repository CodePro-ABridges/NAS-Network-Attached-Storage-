import React, { useState } from "react";
import { FaTimes } from "react-icons/fa"; // Adjusted import for FaTimes
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { createFolder } from "../../../../redux/actionCreators/fileFolderActionCreator";

const CreateFolder = ({ setIsCreateFolderModalOpen }) => {
  const [folderName, setFolderName] = useState("");

  //get data from redux
  const { userFolders, user, currentFolder } = useSelector(
    (state) => ({
      userFolders: state.filefolders.userFolders,
      user: state.auth.user,
      currentFolder: state.filefolders.currentFolder,
    }),
    shallowEqual,
  );

  //setup to pass data to action creator
  const dispatch = useDispatch();

  //Folder Verification
  const checkExistingFolder = (name) => {
    const folderExisting = userFolders.find((folder) => folder.name == name);
    if (folderExisting) {
      return true;
    } else {
      return false;
    }
  };

  //HandleSubmission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (folderName) {
      if (folderName.length > 2) {
        //Condition for checking for existing folder on submission.
        if (!checkExistingFolder(folderName)) {
          const data = {
            createdAt: new Date(),
            name: folderName,
            userId: user.uid,
            createdBy: user.displayName,
            path: currentFolder == "root" ? [] : ["parent folder path"],
            parent: currentFolder,
            lastAccessed: null,
            updatedAt: new Date(),
          };
          //Console Logging Data after submission.
          // console.log(data);

          //passing data to action creator
          dispatch(createFolder(data));
        } else {
          alert("Folder exists!!");
        }
      } else {
        alert("Folder name must be at least 3 characters");
      }
    } else {
      alert("Folder name cannot be empty");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
      <div className="mt-5 bg-white rounded p-4 w-full max-w-md">
        <div className="flex justify-between items-center">
          <h4>Create Folder</h4>
          <button
            className="text-black"
            onClick={() => setIsCreateFolderModalOpen(false)}
          >
            <FaTimes size="1em" />
          </button>
        </div>
        <hr />
        <div className="flex flex-col items-center w-full">
          <form className="mt-3 w-full" onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                id="folderName"
                placeholder="Folder Name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="mt-5 w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center"
            >
              Create Folder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateFolder;
