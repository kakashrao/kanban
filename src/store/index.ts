import { configureStore } from "@reduxjs/toolkit";
import { boardReducer } from "./board";
import { taskReducer } from "./task";
import { themeReducer } from "./theme";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    board: boardReducer,
    task: taskReducer,
  },
});

export type StoreDispatchType = typeof store.dispatch;
export type StoreSelectorType = ReturnType<typeof store.getState>;
export default store;
