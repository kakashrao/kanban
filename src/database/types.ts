import { IDBPDatabase } from "idb";
import KanbanDbSchema from "./schemas/db";

type KanbanDB = IDBPDatabase<KanbanDbSchema>;

export type { KanbanDB };
