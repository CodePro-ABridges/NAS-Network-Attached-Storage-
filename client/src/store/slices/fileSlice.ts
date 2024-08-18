import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";
import { File, Folder } from "../../types.ts";

interface FileState {
  files: File[];
  folders: Folder[];
  loading: boolean;
  error: string | null;
}

const initialState: FileState = {
  files: [],
  folders: [],
  loading: false,
  error: null,
};

export const fetchFiles = createAsyncThunk("file/fetchFiles", async () => {
  try {
    const response = await axios.get("/api/files");
    console.log("API RESPONSE: ", response);
    if (!Array.isArray(response.data)) {
      throw new Error("API did not return an array");
    }
    return response.data;
  } catch (err) {
    console.error("Error fetching files: ", err);
    return isRejectedWithValue(err.message);
  }
});

export const fetchFolders = createAsyncThunk("file/fetchFolders", async () => {
  const response = await axios.get("/api/folders");
  console.log("Fetched Files: ", response.data);
  return response.data;
});

export const uploadFile = createAsyncThunk(
  "file/uploadFile",
  async ({ file, folderId }: { file: File; folderId: string }) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderId", folderId);
    const response = await axios.post("/api/upload", formData);
    return response.data;
  },
);

export const createFolder = createAsyncThunk(
  "file/createFolder",
  async (name: string) => {
    const response = await axios.post("/api/folders", { name });
    return response.data;
  },
);

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Setting files in state: ", action.payload);
        state.files = action.payload;
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchFolders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.loading = false;
        state.folders = action.payload;
      })
      .addCase(fetchFolders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.files.push(action.payload);
      })
      .addCase(createFolder.fulfilled, (state, action) => {
        state.folders.push(action.payload);
      });
  },
});

export default fileSlice.reducer;
