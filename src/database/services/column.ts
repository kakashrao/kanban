import { KanbanDB } from "../types";

async function getColumnById(db: KanbanDB, id: string) {
  try {
    const column = await db.get("columns", id);
    return column;
  } catch (error) {
    throw new Error(
      error?.message ?? "Something went wrong, please try again."
    );
  }
}

async function getColumnsByBoardId(db: KanbanDB | null, boardId: string) {
  if (!db) return;

  try {
    const columns = await db.getAllFromIndex(
      "columns",
      "column_board_idx",
      boardId
    );
    return columns.sort((c1, c2) => c1.order - c2.order);
  } catch (error: any) {
    throw new Error(
      error?.message ?? "Something went wrong, please try again."
    );
  }
}

async function bulkDeleteColumns(db: KanbanDB | null, ids: string[]) {
  if (!db) return;
  if (!ids.length) return;

  try {
    for (const id of ids) {
      await db.delete("columns", id);
    }
  } catch (error) {
    throw new Error(
      error?.message ?? "Something went wrong, please try again."
    );
  }
}

export { bulkDeleteColumns, getColumnById, getColumnsByBoardId };
