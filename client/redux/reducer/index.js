import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import fileFolderReducer from "./fileFolderReducer.js";

const rootReducer = combineReducers({
  auth: authReducer,
  filefolders: fileFolderReducer,
});

export default rootReducer;
