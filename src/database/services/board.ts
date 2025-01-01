import Board from "../models/board";
import Column from "../models/column";
import { BoardRequestSchema } from "../schemas/board";
import { KanbanDB } from "../types";

async function updateBoard(db: KanbanDB | null, value: BoardRequestSchema) {
  const board = new Board({ ...value });

  try {
    const savedBoard = await board.save(db);

    if (!savedBoard) {
      throw new Error("Failed to create board, please try again.");
    }

    if (value.columns.length) {
      for (const col of value.columns) {
        const column = new Column({ ...col, boardId: savedBoard.id });
        await column.save(db);
      }
    }

    return savedBoard;
  } catch (error: any) {
    throw new Error(
      error?.message ?? "Something went wrong, please try again."
    );
  }
}

async function getAllBoards(db: KanbanDB) {
  try {
    const boards = await db.getAll("boards");
    return boards;
  } catch (error) {
    throw new Error(
      error?.message ?? "Something went wrong, please try again."
    );
  }
}

async function getBoardById(db: KanbanDB, id: string) {
  try {
    const board = await db.get("boards", id);
    return board;
  } catch (error) {
    throw new Error(
      error?.message ?? "Something went wrong, please try again."
    );
  }
}

async function getBoardWithColumns(db: KanbanDB, id: string) {
  try {
    const board = await db.get("boards", id);
    const columns = await db.getAllFromIndex("columns", "column_board_idx", id);

    return {
      ...board,
      columns: columns.sort((c1, c2) => c1.order - c2.order),
    };
  } catch (error) {
    throw new Error(
      error?.message ?? "Something went wrong, please try again."
    );
  }
}

async function deleteBoard(db: KanbanDB, id: string) {
  try {
    await db.delete("boards", id);

    const deleteColumns = () => {
      return new Promise((resolve, reject) => {
        const colTransaction = db.transaction("columns", "readwrite");
        const colStore = colTransaction.objectStore("columns");
        const colIdx = colStore.index("column_board_idx");

        const colCursor = colIdx.openCursor(IDBKeyRange.only(id));

        colCursor.then(async (cursor) => {
          while (cursor) {
            cursor.delete();
            cursor = await cursor.continue();
          }
        });

        colTransaction.oncomplete = () => {
          resolve("Success");
        };

        colTransaction.onerror = () => {
          reject("Failed to delete, please try again.");
        };
      });
    };

    await deleteColumns();
  } catch (error) {
    throw new Error(
      error?.message ?? "Something went wrong, please try again."
    );
  }
}

export {
  deleteBoard,
  getAllBoards,
  getBoardById,
  getBoardWithColumns,
  updateBoard,
};
