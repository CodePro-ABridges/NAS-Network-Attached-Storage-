import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.ts";

export const store = configureStore({
  //reducers
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
