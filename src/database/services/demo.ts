import moment from "moment";
import BoardSchema from "../schemas/board";
import { v4 as uuidv4 } from "uuid";
import ColumnSchema from "../schemas/column";
import TaskSchema from "../schemas/task";

export function getDefaultBoard(): BoardSchema {
  return {
    id: uuidv4(),
    name: "My Tasks",
    createdAt: moment().format(),
    updatedAt: moment().format(),
  };
}

export function getDefaultColumns(boardId: string): ColumnSchema[] {
  return [
    {
      id: uuidv4(),
      name: "Todo",
      boardId: boardId,
      order: 1,
      createdAt: moment().format(),
      updatedAt: moment().format(),
    },
    {
      id: uuidv4(),
      name: "In Progress",
      boardId: boardId,
      order: 2,
      createdAt: moment().format(),
      updatedAt: moment().format(),
    },
    {
      id: uuidv4(),
      name: "Done",
      boardId: boardId,
      order: 3,
      createdAt: moment().format(),
      updatedAt: moment().format(),
    },
  ];
}

export function getDefaultTasks(
  boardId: string,
  columnId: string
): TaskSchema[] {
  return [
    {
      id: uuidv4(),
      title: "Create Board, columns and Task",
      description:
        "Play with the application by creating boards, columns and tasks. The data is all yours which means data is stored in your browser only. Don't worry, I will not be able to see your tasks 😉",
      subTasks: [
        { title: "Create and Edit boards", isCompleted: false },
        { title: "Create and Edit columns", isCompleted: false },
        { title: "Create and Edit tasks", isCompleted: false },
        { title: "Switch between light and dark theme.", isCompleted: false },
      ],
      boardId: boardId,
      columnId: columnId,
      createdAt: moment().format(),
      updatedAt: moment().format(),
    },
  ];
}
