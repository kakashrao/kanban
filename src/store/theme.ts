import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "Theme",
  initialState: {
    isDarkTheme: false,
  },
  reducers: {
    toggle(state) {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },
});

const themeReducers = themeSlice.reducer;
const themeActions = themeSlice.actions;

export { themeActions, themeReducers };
