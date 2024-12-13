import { DBSchema, IDBPDatabase } from "idb";

interface KanbanDbSchema extends DBSchema {
  boards: {
    key: string;
    value: number;
  };
}

type KanbanDB = IDBPDatabase<KanbanDbSchema>;

export type { KanbanDB, KanbanDbSchema };
