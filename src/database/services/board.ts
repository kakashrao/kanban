import Board from "../models/board";
import Column from "../models/column";
import { BoardRequestSchema } from "../schemas/board";
import { KanbanDB } from "../types";

async function addBoard(db: KanbanDB | null, value: BoardRequestSchema) {
  const board = new Board({ id: value.id, name: value.name });

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

async function updateBoard(db: KanbanDB | null, value: BoardRequestSchema) {
  const board = new Board(value);

  try {
    const savedBoard = await board.save(db);

    if (!savedBoard) {
      throw new Error("Failed to update board, please try again.");
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

export { addBoard, updateBoard };
