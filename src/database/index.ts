import { openDB } from "idb";

const DATABASE_NAME = "KANBAN";
const DATABASE_VERSION = 2;

const initializeDB = async () => {
  const db = await openDB(DATABASE_NAME, DATABASE_VERSION);
  return db;
};

export default initializeDB;
