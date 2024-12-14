import { DBSchema } from "idb";
import BoardSchema from "./board";
import ColumnSchema from "./column";
import TaskSchema from "./task";

type indexSchema = {
  column_board_idx: string;
  task_board_idx: string;
};

interface KanbanDbSchema extends DBSchema {
  boards: {
    key: string;
    value: BoardSchema;
    indexes: indexSchema;
  };
  columns: {
    key: string;
    value: ColumnSchema;
    indexes: indexSchema;
  };
  tasks: {
    key: string;
    value: TaskSchema;
    indexes: indexSchema;
  };
}

export default KanbanDbSchema;
