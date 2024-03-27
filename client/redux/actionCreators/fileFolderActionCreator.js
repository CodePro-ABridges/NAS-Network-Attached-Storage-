import * as types from "../actions/fileFolderActionTypes.js";

//actions
//
//Add folder action
const addFolder = (payload) => ({
  type: types.CREATE_FOLDER,
  payload,
});

//action creators
//
export const createFolder = (data) => (dispatch) => {
  console.log(data);
};
