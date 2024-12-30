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
  boards: [] satisfies BoardSchema[],
  active: "",
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    changeBoard(state, action) {
      state.active = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      state.boards = action.payload;
      state.isFetching = false;
      state.hasError = false;

      if (!state.active && action.payload.length) {
        state.active = action.payload[0].id;
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
});

const boardActions = boardSlice.actions;
const boardReducer = boardSlice.reducer;

export { boardActions, boardReducer, fetchBoards };
