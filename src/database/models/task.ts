import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import TaskSchema from "../schemas/task";
import { getTaskById } from "../services/task";
import { KanbanDB } from "../types";

class Task implements TaskSchema {
  id: string;
  title: string;
  description: string;
  subTasks: { title: string; isCompleted: boolean }[];
  columnId: string;
  boardId: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(obj: TaskSchema) {
    const { id, title, description, subTasks, columnId, boardId } = obj;
    this.id = id ?? "";
    this.title = title;
    this.description = description ?? "";
    this.subTasks = subTasks ?? [];
    this.columnId = columnId;
    this.boardId = boardId;

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

  async save(db: KanbanDB | null) {
    if (!db) {
      return;
    }

    this.validate();

    const task: TaskSchema = {
      id: this.id,
      title: this.title,
      description: this.description,
      subTasks: this.subTasks,
      columnId: this.columnId,
      boardId: this.boardId,
    };

    task.updatedAt = moment().format();

    if (!task.id) {
      task.id = uuidv4();
      task.createdAt = moment().format();
      await db.add("tasks", task);
    } else {
      const storedTask = await getTaskById(db, task.id);
      await db.put("tasks", { ...storedTask, ...task });
    }

    return task;
  }
}

export default Task;
