import {
  createSlice,
  createAsyncThunk,
  rejectWithValue,
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

export const fetchFiles = createAsyncThunk(
  "file/fetchFiles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/files");
      console.log("API RESPONSE: ", response);
      // if (!Array.isArray(response.data)) {
      //   throw new Error("API did not return an array");
      // }
      return response.data;
    } catch (err) {
      console.error("Error fetching files: ", err);

      if (axios.isAxiosError(err)) {
        //if axios error with response from server.
        return rejectWithValue(
          err.response?.data?.message || "Failed to fetch files",
        );
      } else if (err instanceof Error) {
        //Standard TS/JS error handling.
        return rejectWithValue(err.message);
      } else {
        //if unknown error
        return rejectWithValue(
          "An unknown error occurred while fetching files",
        );
      }
    }
  },
);

export const fetchFolders = createAsyncThunk(
  "file/fetchFolders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/folders");
      console.log("Fetched Folders: ", response.data);
      // if (!Array.isArray(response.data)) {
      //   throw new Error("API did not return an array of folders");
      // }
      return response.data;
    } catch (err) {
      console.error("Error fetching folders: ", err);

      if (axios.isAxiosError(err)) {
        //.
        return rejectWithValue(
          err.response?.data?.message ||
            "An error occurred while fetching folders",
        );
      } else if (err instanceof Error) {
        //.
        return rejectWithValue(err.message);
      } else {
        //.
        return rejectWithValue(
          "An unknown error occurred while fetching folders",
        );
      }
    }
  },
);

export const uploadFile = createAsyncThunk(
  "file/uploadFile",
  async (
    { file, folderId }: { file: File; folderId: string },
    { rejectWithValue },
  ) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folderId", folderId);

      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //debug
      console.log("File upload response: ", response.data);

      if (!response.data || typeof response.data !== "object") {
        throw new Error("Invalid response from server");
      }

      return response.data;
    } catch (err) {
      console.error("Error uploading file: ", err);

      if (axios.isAxiosError(err) && err.response) {
        //.
        return rejectWithValue(
          err.response.data.message || "File upload failed",
        );
      } else if (err instanceof Error) {
        //.
        return rejectWithValue(err.message);
      } else {
        //.
        return rejectWithValue(
          "An unknown error occurred while uploading the file",
        );
      }
    }
  },
);

export const createFolder = createAsyncThunk(
  "file/createFolder",
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/folders", { name });

      //validation of response
      if (!response.data || typeof response.data !== "object") {
        throw new Error("Invalid response from server");
      }

      //debug
      console.log("Folder created: ", response.data);
      return response.data;
    } catch (err) {
      console.error("Error creating folder: ", err);

      if (axios.isAxiosError(err)) {
        //.
        return rejectWithValue(
          err.response?.data?.message || "Failed to create folder",
        );
      } else if (err instanceof Error) {
        //.
        return rejectWithValue(err.message);
      } else {
        //.
        return rejectWithValue(
          "An unknown error occurred while creating the folder",
        );
      }
    }
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
        state.error = null;
        // console.log("Setting files in state: ", action.payload);
        state.files = action.payload;
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch files";
      })
      .addCase(fetchFolders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.folders = action.payload;
      })
      .addCase(fetchFolders.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An error occurred";
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.error = null;
        state.files.push(action.payload);
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "File upload failed";
      })
      .addCase(createFolder.fulfilled, (state, action) => {
        state.error = null;
        state.folders.push(action.payload);
      })
      .addCase(createFolder.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to create folder";
      });
  },
});

export default fileSlice.reducer;
