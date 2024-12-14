import ColumnSchema from "./column";

interface BoardSchema {
  id: string;
  name: string;
}

interface BoardRequestSchema {
  id: string;
  name: string;
  columns: ColumnSchema[];
}

export default BoardSchema;
export type { BoardRequestSchema };
