import { openDB } from "idb";
import { createContext } from "react";
import KanbanDbSchema from "./schemas/db";
import { KanbanDB } from "./types";

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
      for (const storeName of storeNames) {
        if (!db.objectStoreNames.contains(storeName)) {
          const store = db.createObjectStore(storeName, { keyPath: "id" });

          switch (storeName) {
            case "columns":
              store.createIndex("column_board_idx", "boardId");
              break;
            case "tasks":
              store.createIndex("task_board_idx", "boardId");
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
