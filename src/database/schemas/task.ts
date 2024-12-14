interface TaskSchema {
  id: string;
  title: string;
  description: string;
  subtasks: {
    title: string;
    isCompleted: boolean;
  }[];
  columnId: string; // Column Id
}

export default TaskSchema;
