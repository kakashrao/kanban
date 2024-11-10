import { configureStore } from "@reduxjs/toolkit";
import { themeReducers } from "./theme";

const store = configureStore({
  reducer: {
    theme: themeReducers,
  },
});

export type StoreDispatchType = typeof store.dispatch;
export type StoreSelectorType = ReturnType<typeof store.getState>;
export default store;
