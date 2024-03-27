import * as types from "../actions/fileFolderActionTypes.js";

const initialState = {
  isLoading: false,
  currentFolder: "root",
  userFolders: [],
  userFiles: [],
  adminFolders: [],
  adminFiles: [],
};

const fileFolderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_FOLDER:
      return {
        ...state,
        userFolders: [...state.userFolders, action.payload],
      };
    default:
      return state;
  }
};

export default fileFolderReducer;
