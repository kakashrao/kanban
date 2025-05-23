import moment from "moment";
import Task from "../models/task";
import TaskSchema from "../schemas/task";
import { KanbanDB } from "../types";

async function addOrUpdateTask(db: KanbanDB | null, value: TaskSchema) {
  const task = new Task({ ...value });

  try {
    const savedTask = await task.save(db);

    if (!savedTask) {
      throw new Error("Failed to create board, please try again.");
    }

    return savedTask;
  } catch (error: any) {
    throw new Error(
      error?.message ?? "Something went wrong, please try again."
    );
  }
}

async function getTaskById(db: KanbanDB, id: string) {
  try {
    const task = await db.get("tasks", id);
    return task;
  } catch (error) {
    throw new Error(
      error?.message ?? "Something went wrong, please try again."
    );
  }
}

async function getTasksByBoardId(db: KanbanDB | null, boardId: string) {
  if (!db) return;

  try {
    const tasks = await db.getAllFromIndex("tasks", "task_board_idx", boardId);
    return tasks.sort((t1, t2) =>
      moment(t1.createdAt).isBefore(moment(t2.createdAt)) ? -1 : 1
    );
  } catch (error: any) {
    throw new Error(
      error?.message ?? "Something went wrong, please try again."
    );
  }
}

async function deleteTaskById(db: KanbanDB | null, id: string) {
  try {
    await db.delete("tasks", id);
  } catch (error) {
    throw new Error(
      error?.message ?? "Something went wrong, please try again."
    );
  }
}

export { addOrUpdateTask, deleteTaskById, getTaskById, getTasksByBoardId };
