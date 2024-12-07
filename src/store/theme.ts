import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "Theme",
  initialState: {
    isDarkTheme: false,
    sidePanelOpen: true,
  },
  reducers: {
    toggleTheme(state) {
      state.isDarkTheme = !state.isDarkTheme;
    },
    toggleSidePanel(state) {
      state.sidePanelOpen = !state.sidePanelOpen;
    },
  },
});

const themeReducers = themeSlice.reducer;
const themeActions = themeSlice.actions;

export { themeActions, themeReducers };
