import { openDB } from "idb";
import { createContext } from "react";
import { KanbanDB } from "./types";

const DATABASE_NAME = "KANBAN";
const DATABASE_VERSION = 2;

const DBContext = createContext<KanbanDB | null>(null);

const initializeDB = async () => {
  const db = await openDB(DATABASE_NAME, DATABASE_VERSION);
  return db as KanbanDB;
};

export { DBContext, initializeDB };
