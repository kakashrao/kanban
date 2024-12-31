import BoardSchema from "@/database/schemas/board";
import { getAllBoards } from "@/database/services/board";
import { KanbanDB } from "@/database/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchBoards = createAsyncThunk("fetchBoards", async (db: KanbanDB) => {
  const data = await getAllBoards(db);
  return data;
});

const initialState = {
  isFetching: false,
  hasError: false,
  entities: [] satisfies BoardSchema[] as BoardSchema[],
  activeEntity: "",
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    changeBoard(state, action) {
      state.activeEntity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.isFetching = false;
      state.hasError = false;

      if (!state.activeEntity && action.payload.length) {
        state.activeEntity = action.payload[0].id;
      }
    });
    builder.addCase(fetchBoards.pending, (state) => {
      state.isFetching = true;
      state.hasError = false;
    });
    builder.addCase(fetchBoards.rejected, (state) => {
      state.isFetching = false;
      state.hasError = true;
    });
  },
  selectors: {
    getActiveBoard(state) {
      return state.entities.find((d) => d.id === state.activeEntity);
    },
  },
});

const boardActions = boardSlice.actions;
const boardReducer = boardSlice.reducer;
const boardSelectors = boardSlice.selectors;

export { boardActions, boardReducer, boardSelectors, fetchBoards };
