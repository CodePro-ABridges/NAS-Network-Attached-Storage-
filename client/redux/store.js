import { combineReducers, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import authReducer from "./reducer/authReducer.js";

const store = createStore(
  combineReducers({ auth: authReducer }),
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
