import { openDB } from "idb";
import { createContext } from "react";
import KanbanDbSchema from "./schemas/db";
import { KanbanDB } from "./types";
import {
  getDefaultBoard,
  getDefaultColumns,
  getDefaultTasks,
} from "./services/demo";

const DATABASE_NAME = "KANBAN";
const DATABASE_VERSION = 2;
const storeNames: ("boards" | "columns" | "tasks")[] = [
  "boards",
  "columns",
  "tasks",
];

const DBContext = createContext<KanbanDB | null>(null);

const initializeDB = async () => {
  const db = await openDB<KanbanDbSchema>(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(db) {
      const board = getDefaultBoard();
      const columns = getDefaultColumns(board.id);
      const tasks = getDefaultTasks(board.id, columns[0].id);

      for (const storeName of storeNames) {
        if (!db.objectStoreNames.contains(storeName)) {
          const store = db.createObjectStore(storeName, { keyPath: "id" });

          switch (storeName) {
            case "boards":
              store.add(board);
              break;
            case "columns":
              store.createIndex("column_board_idx", "boardId");
              for (const column of columns) {
                store.add(column);
              }
              break;
            case "tasks":
              store.createIndex("task_board_idx", "boardId");
              for (const task of tasks) {
                store.add(task);
              }
              break;
            default:
          }
        }
      }
    },
  });
  return db as KanbanDB;
};

export { DBContext, initializeDB };
