interface ColumnSchema {
  id: string;
  name: string;
  order: number;
  boardId: string; // Board Id
  createdAt?: string;
  updatedAt?: string;
}

export default ColumnSchema;
