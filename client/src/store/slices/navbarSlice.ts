import { createSlice } from "@reduxjs/toolkit";

interface NavbarState {
  isOpen: boolean;
}

const initialState: NavbarState = {
  isOpen: false,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    toggleNavbar: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleNavbar } = navbarSlice.actions;
export default navbarSlice.reducer;
