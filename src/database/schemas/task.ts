interface TaskSchema {
  id: string;
  title: string;
  description: string;
  subtasks: {
    title: string;
    isCompleted: boolean;
  }[];
  boardId: string;
  columnId: string; // Column Id
  createdAt?: string;
  updatedAt?: string;
}

export default TaskSchema;
