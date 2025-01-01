import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import BoardSchema from "../schemas/board";
import { getBoardById } from "../services/board";
import { KanbanDB } from "../types";

class Board implements BoardSchema {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  constructor(obj: BoardSchema) {
    const { id, name } = obj;
    this.id = id ?? "";
    this.name = name;
  }

  validate() {
    if (!this.name || typeof this.name !== "string") {
      throw new Error("Name is required.");
    }
  }

  async save(db: KanbanDB | null) {
    if (!db) {
      return;
    }

    this.validate();

    const board: BoardSchema = {
      id: this.id,
      name: this.name,
    };

    board.updatedAt = moment().format();

    if (!board.id) {
      board.id = uuidv4();
      board.createdAt = moment().format();
      await db.add("boards", board);
    } else {
      const storedBoard = await getBoardById(db, board.id);
      await db.put("boards", { ...storedBoard, ...board });
    }

    return board;
  }
}

export default Board;
