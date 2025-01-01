import TaskSchema from "@/database/schemas/task";
import { getColumnsByBoardId } from "@/database/services/column";
import { getTasksByBoardId } from "@/database/services/task";
import { KanbanDB } from "@/database/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Task {
  columnId: string;
  columnName: string;
  items: Omit<TaskSchema, "boardId" | "columnId">[];
}

const fetchTasksByBoard = createAsyncThunk(
  "fetchTasks",
  async (payload: { db: KanbanDB | null; boardId: string }) => {
    const columns = await getColumnsByBoardId(payload.db, payload.boardId);
    const tasks = await getTasksByBoardId(payload.db, payload.boardId);
    const tasksWithCol: Task[] = [];

    const taskObj: {
      [key: string]: Omit<TaskSchema, "boardId" | "columnId">[];
    } = {};

    tasks.forEach((task) => {
      if (!taskObj[task.columnId]) {
        taskObj[task.columnId] = [];
      }

      taskObj[task.columnId].push({
        id: task.id,
        title: task.title,
        description: task.description,
        subtasks: task.subtasks,
      });
    });

    columns.forEach((col) => {
      tasksWithCol.push({
        columnId: col.id,
        columnName: col.name,
        items: taskObj[col.id] ?? [],
      });
    });

    tasksWithCol.push({
      columnId: "",
      columnName: "",
      items: [],
    });

    return tasksWithCol;
  }
);

const initialState = {
  isFetching: false,
  hasError: false,
  entities: [] satisfies Task[] as Task[],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasksByBoard.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.isFetching = false;
      state.hasError = false;
    });
    builder.addCase(fetchTasksByBoard.pending, (state) => {
      state.isFetching = true;
      state.hasError = false;
    });
    builder.addCase(fetchTasksByBoard.rejected, (state) => {
      state.isFetching = false;
      state.hasError = true;
    });
  },
});

const taskActions = taskSlice.actions;
const taskReducer = taskSlice.reducer;

export { fetchTasksByBoard, taskActions, taskReducer };
export type { Task };
