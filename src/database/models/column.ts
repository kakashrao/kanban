import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import ColumnSchema from "../schemas/column";
import { getColumnById } from "../services/column";
import { KanbanDB } from "../types";

class Column implements ColumnSchema {
  id: string;
  name: string;
  order: number;
  boardId: string;
  indicatingColor?: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(obj: ColumnSchema) {
    const { id, name, boardId, order, indicatingColor } = obj;
    this.id = id ?? "";
    this.name = name;
    this.boardId = boardId;
    this.order = order;
    this.indicatingColor = indicatingColor ?? "red";

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

  async save(db: KanbanDB | null) {
    if (!db) {
      return;
    }

    this.validate();

    const column: ColumnSchema = {
      id: this.id,
      name: this.name,
      order: this.order,
      boardId: this.boardId,
      indicatingColor: this.indicatingColor,
    };

    column.updatedAt = moment().format();

    if (!column.id) {
      column.id = uuidv4();
      column.createdAt = moment().format();
      await db.add("columns", column);
    } else {
      const storedColumn = await getColumnById(db, column.id);
      await db.put("columns", { ...storedColumn, ...column });
    }

    return column;
  }
}

export default Column;
