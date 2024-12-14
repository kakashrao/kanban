import { v4 as uuidv4 } from "uuid";
import ColumnSchema from "../schemas/column";

class Column implements ColumnSchema {
  id: string;
  name: string;
  boardId: string;

  constructor(obj: ColumnSchema) {
    const { id, name, boardId } = obj;
    this.id = id;
    this.name = name;
    this.boardId = boardId;

    if (!this.id) {
      this.id = uuidv4();
    }
  }

  validate() {
    if (!this.name || typeof this.name !== "string") {
      throw new Error("Name is required.");
    } else if (!this.boardId || typeof this.boardId !== "string") {
      throw new Error("Board Id is required.");
    }
  }
}

export default Column;
