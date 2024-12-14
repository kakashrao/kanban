import { v4 as uuidv4 } from "uuid";
import BoardSchema from "../schemas/board";
import { KanbanDB } from "../types";

class Board implements BoardSchema {
  id: string;
  name: string;
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

    const board = { id: this.id, name: this.name };

    if (!board.id) {
      board.id = uuidv4();
      await db.add("boards", board);
    } else {
      await db.put("boards", board);
    }

    return board;
  }
}

export default Board;
