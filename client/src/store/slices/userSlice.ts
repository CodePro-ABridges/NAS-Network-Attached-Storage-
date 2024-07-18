import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  id: string | null;
  username: string | null;
  email: string | null;
  isAuthenticated: boolean;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

//send data to backend
interface UserResponse {
  id: string;
  username: string;
  email: string;
  token: string;
}
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const registerUser = createAsyncThunk<UserResponse, RegisterPayload>(
  "user/register",
  async (userData: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post<UserResponse>(
        `${API_ENDPOINT}/users/register`,
        userData,
      );
      return response.data;
    } catch (err) {
      //Condition for axios err.
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  },
);

export const loginUser = createAsyncThunk<UserResponse, LoginPayload>(
  "user/login",
  async (userData: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post<UserResponse>(
        `${API_ENDPOINT}/users/login`,
        userData,
      );
      return response.data;
    } catch (err) {
      //Condition for axios err.
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  },
);

const initialState: UserState = {
  id: null,
  username: null,
  email: null,
  isAuthenticated: false,
  loading: "idle",
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ id: string; username: string; email: string }>,
    ) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.id = null;
      state.username = null;
      state.email = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            id: string;
            username: string;
            email: string;
          }>,
        ) => {
          state.loading = "succeeded";
          state.id = action.payload.id;
          state.username = action.payload.username;
          state.email = action.payload.email;
          state.isAuthenticated = true;
          state.error = null;
          localStorage.setItem("token", action.payload.token);
        },
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            id: string;
            username: string;
            email: string;
          }>,
        ) => {
          state.loading = "succeeded";
          state.id = action.payload.id;
          state.username = action.payload.username;
          state.email = action.payload.email;
          state.isAuthenticated = true;
          state.error = null;
          localStorage.setItem("token", action.payload.token);
        },
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
