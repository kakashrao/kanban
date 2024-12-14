import { DBSchema } from "idb";
import BoardSchema from "./board";
import ColumnSchema from "./column";
import TaskSchema from "./task";

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

export default KanbanDbSchema;
