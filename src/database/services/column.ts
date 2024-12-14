import { KanbanDB } from "../types";

async function getColumnsByBoardId(db: KanbanDB | null, boardId: string) {
  if (!db) return;

  try {
    const columns = await db.getAllFromIndex(
      "columns",
      "column_board_idx",
      boardId
    );
    return columns;
  } catch (error: any) {
    throw new Error(
      error?.message ?? "Something went wrong, please try again."
    );
  }
}

export { getColumnsByBoardId };
