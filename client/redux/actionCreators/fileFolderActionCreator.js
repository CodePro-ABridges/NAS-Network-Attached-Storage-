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
export const createFolder = (data) => async (dispatch) => {
  try {
    const folderRef = await fire.firestore().collection("folders").add(data);
    const folderSnapshot = await folderRef.get();
    const folderData = folderSnapshot.data();
    const folderId = folderRef.id;

    dispatch(addFolder({ data: folderData, docId: folderId }));
    alert("Folder Created!");
  } catch (error) {
    console.error("Error creating folder: ", error);
  }
};

export const getFolders = (userId) => async (dispatch) => {
  //fetch data then once finish stop loading.
  dispatch(setLoading(true));

  try {
    const foldersSnapshot = await fire
      .firestore()
      .collection("folders")
      .where("userId", "==", userId)
      .get();

    const foldersData = foldersSnapshot.docs.map((doc) => ({
      data: doc.data(),
      docId: doc.id,
    }));
    dispatch(setLoading(false));
    dispatch(addFolders(foldersData));
  } catch (error) {
    console.error("Error fetching folders: ", error);
  } // finally {
  //   //Turning off fetch data after the fetching finishes.
  //   dispatch(setLoading(false));
  // }
};
