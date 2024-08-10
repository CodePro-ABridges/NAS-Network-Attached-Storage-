import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.ts";
import errorReducer from "./slices/errorSlice.ts";
import navbarReducer from "./slices/navbarSlice.ts";
import fileReducer from "./slices/fileSlice.ts";

export const store = configureStore({
  //reducers
  reducer: {
    user: userReducer,
    error: errorReducer,
    navbar: navbarReducer,
    file: fileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
