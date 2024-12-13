import { DBSchema, IDBPDatabase } from "idb";

interface KanbanDbSchema extends DBSchema {
  boards: {
    key: string;
    value: BoardSchema;
  };
  columns: {
    key: string;
    value: ColumnSchema;
  };
  tasks: {
    key: string;
    value: TaskSchema;
  };
}

type KanbanDB = IDBPDatabase<KanbanDbSchema>;

interface BoardSchema {
  id: "string";
  name: "string";
}

interface ColumnSchema {
  id: string;
  label: string;
  board: string; // Board Id
}

interface TaskSchema {
  id: string;
  title: string;
  description: string;
  subtasks: {
    title: string;
    isCompleted: boolean;
  }[];
  column: string; // Column Id
}

export type { BoardSchema, ColumnSchema, KanbanDB, KanbanDbSchema, TaskSchema };
