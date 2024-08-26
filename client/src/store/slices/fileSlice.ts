import {
  createSlice,
  createAsyncThunk,
  rejectWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";
import { File, Folder } from "../../types.ts";
import { RootState } from "../store.ts";

interface FileState {
  files: File[];
  folders: Folder[];
  loading: boolean;
  error: string | null;
  currentFolder: FolderContents | null;
}

interface FolderContents {
  id: string;
  name: string;
  contents: FolderItem[];
}

const initialState: FileState = {
  files: [],
  folders: [],
  loading: false,
  error: null,
};

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const fetchFiles = createAsyncThunk(
  "file/fetchFiles",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(`${API_ENDPOINT}/files`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("API RESPONSE: ", response);
      if (!Array.isArray(response.data)) {
        throw new Error("API did not return an array");
      }
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
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(`${API_ENDPOINT}/folders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetched Folders: ", response.data);
      if (!Array.isArray(response.data)) {
        throw new Error("API did not return an array of folders");
      }
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

export const fetchFolderContents = createAsyncThunk(
  "file/fetchFolderContents",
  async (folderId: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.get(
        `${API_ENDPOINT}/folders/${folderId}/contents`,
      );
      return response.data;
    } catch (err) {
      console.error("Error fetching folder contents: ", err);

      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data?.message ||
            "An error occurred wile fetching folder contents",
        );
      } else if (err instanceof Error) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue(
          "An unknown error occurred while fetching folder contents",
        );
      }
    }
  },
);

export const uploadFile = createAsyncThunk(
  "file/uploadFile",
  async (
    { file, folderId }: { file: File; folderId: string },
    { rejectWithValue, getState },
  ) => {
    try {
      const state = getState() as RootState;
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folderId", folderId);

      const response = await axios.post(
        `${API_ENDPOINT}/files/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

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
  async (name: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.post(
        `${API_ENDPOINT}/folders`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

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
      })
      .addCase(fetchFolderContents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFolderContents.fulfilled, (state, action) => {
        state.loading = false;
        state.currentFolder = action.payload;
      })
      .addCase(fetchFolderContents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default fileSlice.reducer;
