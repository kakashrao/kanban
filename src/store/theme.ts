import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
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

const themeReducer = themeSlice.reducer;
const themeActions = themeSlice.actions;

export { themeActions, themeReducer };
