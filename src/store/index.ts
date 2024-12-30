import { configureStore } from "@reduxjs/toolkit";
import { boardReducer } from "./board";
import { themeReducers } from "./theme";

const store = configureStore({
  reducer: {
    theme: themeReducers,
    board: boardReducer,
  },
});

export type StoreDispatchType = typeof store.dispatch;
export type StoreSelectorType = ReturnType<typeof store.getState>;
export default store;
