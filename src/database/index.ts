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
        console.log(db.objectStoreNames);
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: "id" });
        }
      }
    },
  });
  return db as KanbanDB;
};

export { DBContext, initializeDB };
