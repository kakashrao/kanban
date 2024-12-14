import { v4 as uuidv4 } from "uuid";
import BoardSchema from "../schemas/board";

class Board implements BoardSchema {
  id: string;
  name: string;
  constructor(obj: BoardSchema) {
    const { id, name } = obj;
    this.id = id;
    this.name = name;

    if (!this.id) {
      this.id = uuidv4();
    }
  }

  validate() {
    if (!this.name || typeof this.name !== "string") {
      throw new Error("Name is required.");
    }
  }
}

export default Board;
