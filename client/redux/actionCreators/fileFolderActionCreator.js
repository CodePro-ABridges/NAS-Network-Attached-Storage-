import * as types from "../actions/fileFolderActionTypes.js";
import fire from "../../config/firebase.js";
//actions
//
//Add folder action
//adds single folder
const addFolder = (payload) => ({
  type: types.CREATE_FOLDER,
  payload,
});

//add all folders
const addFolders = (payload) => ({
  type: types.ADD_FOLDERS,
  payload,
});

//
const setLoading = (payload) => ({
  type: types.SET_LOADING,
  payload,
});

//action creators
//
export const createFolder = (data) => (dispatch) => {
  console.log(data);
  fire
    .firestore()
    .collection("folders")
    .add(data)
    .then(async (folder) => {
      //retrieving data
      const folderData = await (await folder.get()).data();

      dispatch(addFolder(folderData));
      alert("Folder Created!");
    });
};

export const getFolders = (userId) => (dispatch) => {
  //data handling
  dispatch(setLoading(true));

  fire
    .firestore()
    .collection("folders")
    .where("userId", "==", userId)
    .get()
    .then(async (folders) => {
      const folderData = await folders.docs.map((folder) => folder.data());
      dispatch(addFolders(folderData));
      //after fetching of all folders
      dispatch(setLoading(false));
    });
};
