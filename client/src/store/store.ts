import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.ts";
import errorReducer from "./slices/errorSlice.ts";

export const store = configureStore({
  //reducers
  reducer: {
    user: userReducer,
    error: errorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
