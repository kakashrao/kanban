import { KanbanDB } from "../types";

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
    return tasks;
  } catch (error: any) {
    throw new Error(
      error?.message ?? "Something went wrong, please try again."
    );
  }
}

export { getTaskById, getTasksByBoardId };
