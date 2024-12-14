import { v4 as uuidv4 } from "uuid";
import TaskSchema from "../schemas/task";

class Task implements TaskSchema {
  id: string;
  title: string;
  description: string;
  subtasks: { title: string; isCompleted: boolean }[];
  columnId: string;

  constructor(obj: TaskSchema) {
    const { id, title, description, subtasks, columnId } = obj;
    this.id = id;
    this.title = title;
    this.description = description ?? "";
    this.subtasks = subtasks ?? [];
    this.columnId = columnId;

    if (!this.id) {
      this.id = uuidv4();
    }
  }

  validate() {
    if (!this.title || typeof this.title !== "string") {
      throw new Error("Name is required.");
    } else if (!this.columnId || typeof this.columnId !== "string") {
      throw new Error("Column Id is required.");
    } else if (this.description && typeof this.description !== "string") {
      throw new Error("Please provide valid description.");
    }
  }
}

export default Task;
